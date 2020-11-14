package middleware

//go:generate go run github.com/vektra/mockery/v2 --name=AuthConfig --case=snake
//go:generate go run github.com/vektra/mockery/v2 --name=Context --srcpkg=github.com/labstack/echo/v4 --case=snake --structname=EchoContext
//go:generate go run github.com/vektra/mockery/v2 --name=Store --srcpkg=github.com/gorilla/sessions --case=snake --structname=SessionStore

import (
	"log"
	"net/http"

	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"github.com/sparkymat/markit/database"
	fbjwt "github.com/sparkymat/markit/jwt"
)

const (
	CurrentUserKey = "current_user"
	SessionKey     = "session"

	TokenAttribute  = "token"
	UserIDAttribute = "user_id"
)

type AuthConfig interface {
	JWTSecret() string
	LoginPath() string
}

func AuthWithConfig(config AuthConfig, jwtService fbjwt.API, userDB database.User) func(echo.HandlerFunc) echo.HandlerFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			sess, err := session.Get(SessionKey, c)
			if err != nil || sess.Values[TokenAttribute] == nil {
				if err != nil {
					log.Print(err.Error())
				}
				return c.Redirect(http.StatusTemporaryRedirect, config.LoginPath())
			}

			tokenString := sess.Values[TokenAttribute].(string)
			if tokenString == "" {
				log.Print("token missing")
				return c.Redirect(http.StatusTemporaryRedirect, config.LoginPath())
			}

			claims, err := jwtService.ClaimsFromTokenString(tokenString)
			if err != nil {
				log.Print(err.Error())
				return c.Redirect(http.StatusTemporaryRedirect, config.LoginPath())
			}

			userID := claims[UserIDAttribute]

			user, err := userDB.Find(c, userID)
			if err != nil {
				log.Print(err.Error())
				return c.Redirect(http.StatusTemporaryRedirect, config.LoginPath())
			}

			c.Set(CurrentUserKey, user)

			return next(c)
		}
	}
}
