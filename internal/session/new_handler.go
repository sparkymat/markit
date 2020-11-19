package session

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/newrelic/go-agent/v3/newrelic"
	"github.com/sparkymat/markit/view"
	"github.com/sparkymat/markit/view/page"
)

func NewHandler(c echo.Context) error {
	span := newrelic.FromContext(c.Request().Context()).StartSegment("session_new_handler")
	defer span.End()

	html := view.Layout("Finchbook | Login", page.NewSession())
	return c.HTML(http.StatusOK, html)
}
