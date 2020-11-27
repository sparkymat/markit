package router

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/sessions"
	"github.com/jmoiron/sqlx"
	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/sparkymat/markit/database"
	"github.com/sparkymat/markit/internal/bookmark"
	fbsession "github.com/sparkymat/markit/internal/session"
	"github.com/sparkymat/markit/jwt"
	"github.com/sparkymat/markit/login"
	fbmiddleware "github.com/sparkymat/markit/middleware"
)

type Config interface {
	JWTSecret() string
	SessionSecret() string
	TokenTimeout() time.Duration
	RootPath() string
	LoginPath() string
	DatabaseString() string
	LogFormat() string
}

func Setup(router *echo.Echo, config Config) {
	db, err := sqlx.Connect("postgres", config.DatabaseString())
	if err != nil {
		log.Fatalln(err)
	}

	err = db.Ping()
	if err != nil {
		log.Fatalln(err)
	}

	router.Use(func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			c.Set("db", db)
			return next(c)
		}
	})

	jwtService := jwt.New(config)
	userDB := database.NewUser()
	loginService := login.New(config, jwtService)

	router.Use(middleware.SecureWithConfig(middleware.SecureConfig{
		XSSProtection:         "1; mode=block",
		ContentTypeNosniff:    "nosniff",
		XFrameOptions:         "SAMEORIGIN",
		HSTSMaxAge:            3600,
		ContentSecurityPolicy: "default-src 'self'",
	}))
	router.Use(session.Middleware(sessions.NewCookieStore([]byte(config.SessionSecret()))))
	router.Use(middleware.GzipWithConfig(middleware.GzipConfig{
		Skipper: middleware.DefaultSkipper,
		Level:   5,
	}))

	router.GET("/health", func(c echo.Context) error {
		return c.String(http.StatusOK, "OK")
	})

	router.Static("css", "public/css")
	router.Static("fonts", "public/fonts")

	var logConfig middleware.LoggerConfig

	if config.LogFormat() == "json" {
		logConfig = middleware.DefaultLoggerConfig
	} else {
		logConfig = middleware.LoggerConfig{
			Skipper: middleware.DefaultSkipper,
			Format:  "[${time_rfc3339_nano}] Incoming ${method} on ${uri} from ${remote_ip}. Responded with ${status}. Latency: ${latency_human}\n",
			Output:  os.Stdout,
		}
	}

	app := router.Group("", middleware.LoggerWithConfig(logConfig))

	unauthenticatedApp := app.Group("")
	unauthenticatedApp.Use(fbmiddleware.UnauthWithConfig(config, jwtService, userDB))

	// Unauthenticated routes
	unauthenticatedApp.GET("/login", fbsession.NewHandler)
	unauthenticatedApp.POST("/login", fbsession.CreateHandler(config, userDB, loginService))

	authenticatedApp := app.Group("")
	authenticatedApp.Use(fbmiddleware.AuthWithConfig(config, jwtService, userDB))

	// Authenticated routes
	authenticatedApp.GET("/", bookmark.HomeHandler)
}
