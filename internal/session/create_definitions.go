package session

type CreateRequest struct {
	Username string `form:"username"`
	Password string `form:"password"`
}
