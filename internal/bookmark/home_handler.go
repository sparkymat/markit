package bookmark

import (
	"net/http"

	"github.com/labstack/echo/v4"
	newrelic "github.com/newrelic/go-agent/v3/newrelic"
	"github.com/sparkymat/markit/view"
	"github.com/sparkymat/markit/view/page"
)

func HomeHandler(c echo.Context) error {
	span := newrelic.FromContext(c.Request().Context()).StartSegment("bookmark_home_handler")
	defer span.End()

	html := view.Layout("mark_it!", page.BookmarkHome())
	return c.HTML(http.StatusOK, html)
}
