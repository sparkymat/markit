package session

//go:generate go run github.com/vektra/mockery/v2 --name=Context --srcpkg=github.com/labstack/echo/v4 --case=snake
//go:generate go run github.com/vektra/mockery/v2 --name=Store --srcpkg=github.com/gorilla/sessions --case=snake --structname=SessionStore
//go:generate go run github.com/vektra/mockery/v2 --name=CreateConfig --case=snake

import (
	"errors"
	"fmt"
	"net/http"

	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"github.com/sparkymat/markit/database"
	"github.com/sparkymat/markit/login"
	"github.com/sparkymat/markit/middleware"
)

type CreateConfig interface {
	JWTSecret() string
	RootPath() string
}

func CreateHandler(cfg CreateConfig, userDB database.User, loginService login.API) func(echo.Context) error {
	return func(c echo.Context) error {
		var req CreateRequest
		if err := c.Bind(&req); err != nil {
			return renderError(c, err)
		}

		if req.Username == "" || req.Password == "" {
			return renderError(c, errors.New("username or password blank"))
		}

		user, err := userDB.FindByUsername(c, req.Username)
		if err != nil {
			wrappedErr := fmt.Errorf("userDB.FindByUsername failed: %w", err)
			return renderError(c, wrappedErr)
		}

		if loginService.VerifyPassword(c, user.EncryptedPassword, req.Password) != nil {
			return renderError(c, errors.New("password doesn't match"))
		}

		sess, err := session.Get(middleware.SessionKey, c)
		if err != nil {
			wrappedErr := fmt.Errorf("failed to load session: %w", err)
			return renderError(c, wrappedErr)
		}

		if err := loginService.StoreTokenInSession(c.Response(), c.Request(), user.ID, sess); err != nil {
			return renderError(c, err)
		}

		return c.Redirect(http.StatusSeeOther, cfg.RootPath())
	}
}

func renderError(c echo.Context, err error) error {
	return c.String(http.StatusUnauthorized, fmt.Sprintf("error: %s", err.Error()))
}
