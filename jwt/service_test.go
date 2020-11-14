package jwt_test

import (
	"testing"
	"time"

	"github.com/sparkymat/markit/jwt"
	"github.com/sparkymat/markit/jwt/mocks"
	"github.com/stretchr/testify/require"
)

func TestTokenStringForClaims(t *testing.T) {
	testCases := []struct {
		testCaseName  string
		jwtSecret     string
		tokenTimeout  time.Duration
		claims        map[string]string
		errorExpected bool
	}{
		{
			testCaseName: "error if secret is empty",
			jwtSecret:    "",
			claims: map[string]string{
				"foo": "bar",
			},
			errorExpected: false,
		},
	}

	for _, testCase := range testCases {
		testCase := testCase
		t.Run(testCase.testCaseName, func(t *testing.T) {
			cfg := &mocks.Config{}
			cfg.On("JWTSecret").Return(testCase.jwtSecret)
			cfg.On("TokenTimeout").Return(testCase.tokenTimeout)

			jwtService := jwt.New(cfg)

			token, err := jwtService.TokenStringForClaims(testCase.claims)

			if testCase.errorExpected {
				require.Error(t, err)
			} else {
				println(token)
				require.NoError(t, err)

				claims, err := jwtService.ClaimsFromTokenString(token)
				require.NoError(t, err)

				require.Equal(t, "bar", claims["foo"])
			}
		})
	}
}
