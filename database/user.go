package database

//go:generate go run github.com/vektra/mockery/v2 --name=User --case=snake

import (
	"errors"
	"fmt"

	"github.com/jmoiron/sqlx"
	"github.com/labstack/echo/v4"
	"github.com/sparkymat/markit/definitions"
)

var (
	ErrConnectionNotFound = errors.New("db connection not found")
	ErrRecordNotFound     = errors.New("record not found")
)

type User interface {
	Find(c echo.Context, id string) (*definitions.User, error)
	FindByUsername(c echo.Context, username string) (*definitions.User, error)
}

func NewUser() User {
	return &userService{}
}

type userService struct {
}

func (u *userService) Find(c echo.Context, id string) (*definitions.User, error) {
	db, isValid := c.Get("db").(*sqlx.DB)
	if !isValid {
		return nil, ErrConnectionNotFound
	}

	var user definitions.User
	err := db.QueryRowx("SELECT * FROM users WHERE id::text=$1", id).StructScan(&user)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch user by id=%s. error: %w", id, err)
	}

	return &user, nil
}

func (u *userService) FindByUsername(c echo.Context, username string) (*definitions.User, error) {
	db, isValid := c.Get("db").(*sqlx.DB)
	if !isValid {
		return nil, ErrConnectionNotFound
	}

	var user definitions.User
	err := db.QueryRowx("SELECT * FROM users WHERE username=$1", username).StructScan(&user)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch user by username. error: %w", err)
	}

	return &user, nil
}
