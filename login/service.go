package login

//go:generate go run github.com/vektra/mockery/v2 --name=Config --case=snake
//go:generate go run github.com/vektra/mockery/v2 --name=API --case=snake --structname=Service --filename=service.go
//go:generate go run github.com/vektra/mockery/v2 --name=Context --srcpkg=github.com/labstack/echo/v4 --structname=EchoContext

import (
	"fmt"
	"net/http"

	"github.com/gorilla/sessions"
	"github.com/labstack/echo/v4"
	fbjwt "github.com/sparkymat/markit/jwt"
	"github.com/sparkymat/markit/middleware"
	"golang.org/x/crypto/bcrypt"
)

type Config interface {
	JWTSecret() string
}

type API interface {
	StoreTokenInSession(w *echo.Response, r *http.Request, userID string, sess *sessions.Session) error
	VerifyPassword(c echo.Context, encryptedPassword string, inputPassword string) error
}

func New(cfg Config, jwtService fbjwt.API) API {
	return &service{
		Config:     cfg,
		JwtService: jwtService,
	}
}

type service struct {
	Config     Config
	JwtService fbjwt.API
}

func (s *service) StoreTokenInSession(w *echo.Response, r *http.Request, userID string, sess *sessions.Session) error {
	tokenString, err := s.JwtService.TokenStringForClaims(map[string]string{
		middleware.UserIDAttribute: userID,
	})
	if err != nil {
		return fmt.Errorf("signing failed: %w", err)
	}

	sess.Options = &sessions.Options{
		Path:     "/",
		MaxAge:   86400 * 7,
		HttpOnly: true,
		Secure:   true,
		SameSite: http.SameSiteStrictMode,
	}
	sess.Values[middleware.TokenAttribute] = tokenString

	err = sess.Save(r, w)
	if err != nil {
		return fmt.Errorf("failed to save session: %w", err)
	}

	return nil
}

func (s *service) VerifyPassword(c echo.Context, encryptedPassword string, inputPassword string) error {
	return bcrypt.CompareHashAndPassword([]byte(encryptedPassword), []byte(inputPassword))
}
