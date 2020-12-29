package main

//go:generate go run github.com/valyala/quicktemplate/qtc -dir=view

import (
	"fmt"

	"github.com/labstack/echo/v4"
	_ "github.com/lib/pq"
	"github.com/sparkymat/markit/config"
	"github.com/sparkymat/markit/router"
)

func main() {
	appConfig := config.New()
	e := echo.New()
	router.Setup(e, appConfig)
	e.Logger.Fatal(e.Start(fmt.Sprintf("%s:%d", appConfig.HTTPAddress(), appConfig.HTTPPort())))
}
