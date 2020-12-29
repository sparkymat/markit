// Code generated by qtc from "input.qtpl". DO NOT EDIT.
// See https://github.com/valyala/quicktemplate for details.

//line view/partial/input.qtpl:1
package partial

//line view/partial/input.qtpl:1
import (
	qtio422016 "io"

	qt422016 "github.com/valyala/quicktemplate"
)

//line view/partial/input.qtpl:1
var (
	_ = qtio422016.Copy
	_ = qt422016.AcquireByteBuffer
)

//line view/partial/input.qtpl:1
func StreamTextInput(qw422016 *qt422016.Writer, id string, name string, placeholder string) {
//line view/partial/input.qtpl:1
	qw422016.N().S(`
  <div class="row">
    <div class="input-field col s12">
      <input placeholder="`)
//line view/partial/input.qtpl:4
	qw422016.E().S(placeholder)
//line view/partial/input.qtpl:4
	qw422016.N().S(`" name="`)
//line view/partial/input.qtpl:4
	qw422016.E().S(name)
//line view/partial/input.qtpl:4
	qw422016.N().S(`" id="`)
//line view/partial/input.qtpl:4
	qw422016.E().S(id)
//line view/partial/input.qtpl:4
	qw422016.N().S(`" type="text" class="validate">
      <label for="`)
//line view/partial/input.qtpl:5
	qw422016.E().S(id)
//line view/partial/input.qtpl:5
	qw422016.N().S(`">`)
//line view/partial/input.qtpl:5
	qw422016.E().S(placeholder)
//line view/partial/input.qtpl:5
	qw422016.N().S(`</label>
    </div>
  </div>
`)
//line view/partial/input.qtpl:8
}

//line view/partial/input.qtpl:8
func WriteTextInput(qq422016 qtio422016.Writer, id string, name string, placeholder string) {
//line view/partial/input.qtpl:8
	qw422016 := qt422016.AcquireWriter(qq422016)
//line view/partial/input.qtpl:8
	StreamTextInput(qw422016, id, name, placeholder)
//line view/partial/input.qtpl:8
	qt422016.ReleaseWriter(qw422016)
//line view/partial/input.qtpl:8
}

//line view/partial/input.qtpl:8
func TextInput(id string, name string, placeholder string) string {
//line view/partial/input.qtpl:8
	qb422016 := qt422016.AcquireByteBuffer()
//line view/partial/input.qtpl:8
	WriteTextInput(qb422016, id, name, placeholder)
//line view/partial/input.qtpl:8
	qs422016 := string(qb422016.B)
//line view/partial/input.qtpl:8
	qt422016.ReleaseByteBuffer(qb422016)
//line view/partial/input.qtpl:8
	return qs422016
//line view/partial/input.qtpl:8
}

//line view/partial/input.qtpl:10
func StreamPasswordInput(qw422016 *qt422016.Writer, id string, name string, placeholder string) {
//line view/partial/input.qtpl:10
	qw422016.N().S(`
  <div class="row">
    <div class="input-field col s12">
      <input placeholder="`)
//line view/partial/input.qtpl:13
	qw422016.E().S(placeholder)
//line view/partial/input.qtpl:13
	qw422016.N().S(`" name="`)
//line view/partial/input.qtpl:13
	qw422016.E().S(name)
//line view/partial/input.qtpl:13
	qw422016.N().S(`" id="`)
//line view/partial/input.qtpl:13
	qw422016.E().S(id)
//line view/partial/input.qtpl:13
	qw422016.N().S(`" type="password" class="validate">
      <label for="`)
//line view/partial/input.qtpl:14
	qw422016.E().S(id)
//line view/partial/input.qtpl:14
	qw422016.N().S(`">`)
//line view/partial/input.qtpl:14
	qw422016.E().S(placeholder)
//line view/partial/input.qtpl:14
	qw422016.N().S(`</label>
    </div>
  </div>
`)
//line view/partial/input.qtpl:17
}

//line view/partial/input.qtpl:17
func WritePasswordInput(qq422016 qtio422016.Writer, id string, name string, placeholder string) {
//line view/partial/input.qtpl:17
	qw422016 := qt422016.AcquireWriter(qq422016)
//line view/partial/input.qtpl:17
	StreamPasswordInput(qw422016, id, name, placeholder)
//line view/partial/input.qtpl:17
	qt422016.ReleaseWriter(qw422016)
//line view/partial/input.qtpl:17
}

//line view/partial/input.qtpl:17
func PasswordInput(id string, name string, placeholder string) string {
//line view/partial/input.qtpl:17
	qb422016 := qt422016.AcquireByteBuffer()
//line view/partial/input.qtpl:17
	WritePasswordInput(qb422016, id, name, placeholder)
//line view/partial/input.qtpl:17
	qs422016 := string(qb422016.B)
//line view/partial/input.qtpl:17
	qt422016.ReleaseByteBuffer(qb422016)
//line view/partial/input.qtpl:17
	return qs422016
//line view/partial/input.qtpl:17
}
