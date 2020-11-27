// Code generated by qtc from "bookmark_home.qtpl". DO NOT EDIT.
// See https://github.com/valyala/quicktemplate for details.

//line view/page/bookmark_home.qtpl:1
package page

//line view/page/bookmark_home.qtpl:1
import "github.com/sparkymat/markit/view/partial"

//line view/page/bookmark_home.qtpl:3
import (
	qtio422016 "io"

	qt422016 "github.com/valyala/quicktemplate"
)

//line view/page/bookmark_home.qtpl:3
var (
	_ = qtio422016.Copy
	_ = qt422016.AcquireByteBuffer
)

//line view/page/bookmark_home.qtpl:3
func StreamBookmarkHome(qw422016 *qt422016.Writer) {
//line view/page/bookmark_home.qtpl:3
	qw422016.N().S(`
  `)
//line view/page/bookmark_home.qtpl:4
	partial.StreamDropdown(qw422016, map[string]string{"Home": "/"})
//line view/page/bookmark_home.qtpl:4
	qw422016.N().S(`
`)
//line view/page/bookmark_home.qtpl:5
}

//line view/page/bookmark_home.qtpl:5
func WriteBookmarkHome(qq422016 qtio422016.Writer) {
//line view/page/bookmark_home.qtpl:5
	qw422016 := qt422016.AcquireWriter(qq422016)
//line view/page/bookmark_home.qtpl:5
	StreamBookmarkHome(qw422016)
//line view/page/bookmark_home.qtpl:5
	qt422016.ReleaseWriter(qw422016)
//line view/page/bookmark_home.qtpl:5
}

//line view/page/bookmark_home.qtpl:5
func BookmarkHome() string {
//line view/page/bookmark_home.qtpl:5
	qb422016 := qt422016.AcquireByteBuffer()
//line view/page/bookmark_home.qtpl:5
	WriteBookmarkHome(qb422016)
//line view/page/bookmark_home.qtpl:5
	qs422016 := string(qb422016.B)
//line view/page/bookmark_home.qtpl:5
	qt422016.ReleaseByteBuffer(qb422016)
//line view/page/bookmark_home.qtpl:5
	return qs422016
//line view/page/bookmark_home.qtpl:5
}
