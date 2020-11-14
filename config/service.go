package config

import (
	"time"

	"github.com/caarlos0/env"
)

type API interface {
	DatabaseString() string
	HTTPAddress() string
	HTTPPort() int
	JWTSecret() string
	ServerReadTimeoutSeconds() int
	ServerWriteTimeoutSeconds() int
	SessionSecret() string
	TokenTimeout() time.Duration
	LoginPath() string
	RootPath() string
	LogFormat() string
}

func New() API {
	var envValues envValues

	if err := env.Parse(&envValues); err != nil {
		panic(err)
	}

	return &service{
		envValues: envValues,
	}
}

type service struct {
	envValues envValues
}

type envValues struct {
	JWTSecret      string `env:"JWT_SECRET,required"`
	SessionSecret  string `env:"SESSION_SECRET,required"`
	DatabaseString string `env:"DATABASE_STRING,required"`
	LogFormat      string `env:"LOG_FORMAT"`
}

func (s *service) HTTPAddress() string {
	return ""
}

func (s *service) HTTPPort() int {
	return 8080
}

func (s *service) ServerReadTimeoutSeconds() int {
	return 5
}

func (s *service) ServerWriteTimeoutSeconds() int {
	return 5
}

func (s *service) JWTSecret() string {
	return s.envValues.JWTSecret
}

func (s *service) SessionSecret() string {
	return s.envValues.SessionSecret
}

func (s *service) TokenTimeout() time.Duration {
	return 7 * 24 * time.Second
}

func (s *service) DatabaseString() string {
	return s.envValues.DatabaseString
}

func (s *service) LoginPath() string {
	return "/login"
}

func (s *service) RootPath() string {
	return "/"
}

func (s *service) LogFormat() string {
	return s.envValues.LogFormat
}
