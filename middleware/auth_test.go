package middleware_test

import (
	"errors"
	"net/http"
	"testing"

	"github.com/gorilla/sessions"
	"github.com/labstack/echo/v4"
	"github.com/sparkymat/markit/database"
	dbmocks "github.com/sparkymat/markit/database/mocks"
	"github.com/sparkymat/markit/definitions"
	"github.com/sparkymat/markit/jwt"
	jwtmocks "github.com/sparkymat/markit/jwt/mocks"
	"github.com/sparkymat/markit/middleware"
	mwmocks "github.com/sparkymat/markit/middleware/mocks"
	"github.com/stretchr/testify/mock"
)

func TestAuthWithConfig(t *testing.T) {
	testCases := []struct {
		testCaseName     string
		session          sessions.Store
		jwtService       jwt.API
		userDB           database.User
		redirectExpected bool
	}{
		{
			testCaseName: "error if no session found",
			session: func() sessions.Store {
				store := &mwmocks.SessionStore{}
				store.On("Get", mock.Anything, mock.Anything).Return(nil, errors.New("session not found"))
				return store
			}(),
			redirectExpected: true,
		},
		{
			testCaseName: "error if token is missing",
			session: func() sessions.Store {
				store := &mwmocks.SessionStore{}
				store.On("Get", mock.Anything, mock.Anything).Return(&sessions.Session{}, nil)
				return store
			}(),
			redirectExpected: true,
		},
		{
			testCaseName: "no redirect if all is well",
			jwtService: func() jwt.API {
				s := &jwtmocks.Service{}
				s.On("ClaimsFromTokenString", mock.Anything).Return(map[string]string{
					"userID": "user-id-1",
				}, nil)
				return s
			}(),
			userDB: func() database.User {
				s := &dbmocks.User{}
				s.On("Find", mock.Anything, mock.Anything).Return(&definitions.User{}, nil)
				return s
			}(),
			session: func() sessions.Store {
				store := &mwmocks.SessionStore{}
				store.On("Get", mock.Anything, mock.Anything).Return(&sessions.Session{
					Values: map[interface{}]interface{}{
						"token": "jwt-token",
					},
				}, nil)
				return store
			}(),
			redirectExpected: false,
		},
	}

	for _, testCase := range testCases {
		testCase := testCase
		t.Run(testCase.testCaseName, func(t *testing.T) {
			next := func(c echo.Context) error {
				return nil
			}

			config := &mwmocks.AuthConfig{}
			config.On("LoginPath").Return("/login")

			mw := middleware.AuthWithConfig(config, testCase.jwtService, testCase.userDB)
			handler := mw(next)

			c := &mwmocks.EchoContext{}
			c.On("Get", mock.Anything).Return(testCase.session)
			c.On("Request").Return(&http.Request{})
			c.On("SetRequest", mock.Anything)
			c.On("Set", middleware.CurrentUserKey, mock.Anything)

			if testCase.redirectExpected {
				c.On("Redirect", mock.Anything, mock.Anything).Return(nil).Once()
			}

			_ = handler(c)

		})
	}
}
