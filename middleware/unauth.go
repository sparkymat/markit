package middleware

//go:generate mockery --name=UnauthConfig --case=snake

import (
	"net/http"

	"github.com/labstack/echo-contrib/session"
	"github.com/labstack/echo/v4"
	"github.com/sparkymat/markit/database"
	fbjwt "github.com/sparkymat/markit/jwt"
)

type UnauthConfig interface {
	JWTSecret() string
	RootPath() string
}

func UnauthWithConfig(config UnauthConfig, jwtService fbjwt.API, userDB database.User) func(echo.HandlerFunc) echo.HandlerFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			sess, err := session.Get(SessionKey, c)
			if err != nil || sess.Values[TokenAttribute] == nil {
				return next(c)
			}

			tokenString := sess.Values[TokenAttribute].(string)
			if tokenString == "" {
				return next(c)
			}

			claims, err := jwtService.ClaimsFromTokenString(tokenString)
			if err != nil {
				sess.Values[TokenAttribute] = ""
				_ = sess.Save(c.Request(), c.Response())
				return next(c)
			}

			userID := claims[UserIDAttribute]

			_, err = userDB.Find(c, userID)
			if err != nil {
				sess.Values[TokenAttribute] = ""
				_ = sess.Save(c.Request(), c.Response())
				return next(c)
			}

			return c.Redirect(http.StatusTemporaryRedirect, config.RootPath())
		}
	}
}
