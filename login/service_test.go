package login_test

import (
	"testing"

	jwtmocks "github.com/sparkymat/markit/jwt/mocks"
	"github.com/sparkymat/markit/login"
	"github.com/sparkymat/markit/login/mocks"
	"github.com/stretchr/testify/require"
)

func TestVerifyPassword(t *testing.T) {
	testCases := []struct {
		testCaseName      string
		encryptedPassword string
		inputPassword     string
		errorExpected     bool
	}{
		{
			testCaseName:      "success if correct encrypted password",
			encryptedPassword: "$2a$08$/k/HtlnnTKyGEZSlJ/WsiOprcmu7zFC0YiwtQbXlI/absOBStUdHq",
			inputPassword:     "foo",
			errorExpected:     false,
		},
		{
			testCaseName:      "failure if incorrect encrypted password",
			encryptedPassword: "bar",
			inputPassword:     "foo",
			errorExpected:     true,
		},
	}

	for _, testCase := range testCases {
		testCase := testCase
		t.Run(testCase.testCaseName, func(t *testing.T) {
			cfg := &mocks.Config{}
			jwtService := &jwtmocks.Service{}
			echoContext := &mocks.EchoContext{}

			s := login.New(cfg, jwtService)

			err := s.VerifyPassword(echoContext, testCase.encryptedPassword, testCase.inputPassword)

			if testCase.errorExpected {
				require.Error(t, err)
			} else {
				require.NoError(t, err)
			}
		})
	}
}
