package jwt

//go:generate go run github.com/vektra/mockery/v2 --name=API --structname=Service --case=snake
//go:generate go run github.com/vektra/mockery/v2 --name=Config --case=snake

import (
	"fmt"
	"time"

	jwtlib "github.com/dgrijalva/jwt-go"
)

type API interface {
	TokenStringForClaims(claims map[string]string) (string, error)
	ClaimsFromTokenString(tokenString string) (map[string]string, error)
}

type Config interface {
	JWTSecret() string
	TokenTimeout() time.Duration
}

func New(cfg Config) API {
	return &service{Config: cfg}
}

type service struct {
	Config Config
}

func (s *service) TokenStringForClaims(claims map[string]string) (string, error) {
	mapClaims := jwtlib.MapClaims{}
	for k, v := range claims {
		mapClaims[k] = v
	}
	mapClaims["exp"] = time.Now().Add(s.Config.TokenTimeout()).Unix()

	token := jwtlib.NewWithClaims(jwtlib.SigningMethodHS512, mapClaims)
	tokenString, err := token.SignedString([]byte(s.Config.JWTSecret()))
	if err != nil {
		return "", fmt.Errorf("signing failed: %w", err)
	}

	return tokenString, nil
}

func (s *service) ClaimsFromTokenString(tokenString string) (map[string]string, error) {
	token, err := jwtlib.Parse(tokenString, func(token *jwtlib.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwtlib.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(s.Config.JWTSecret()), nil
	})
	if err != nil {
		return nil, fmt.Errorf("failed to parse jwt token: %w", err)
	}

	if claims, ok := token.Claims.(jwtlib.MapClaims); ok && token.Valid {
		returnedClaims := map[string]string{}
		for k, v := range claims {
			if k != "nbf" && k != "exp" {
				returnedClaims[k] = v.(string)
			}
		}
		return returnedClaims, nil
	}

	return nil, err
}
