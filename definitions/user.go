package definitions

import "time"

type User struct {
	ID                string    `db:"id" json:"id"`
	Username          string    `db:"username" json:"username"`
	Email             string    `db:"email" json:"email"`
	EncryptedPassword string    `db:"encrypted_password" json:"-"`
	CreatedAt         time.Time `db:"created_at" json:"created_at"`
	UpdatedAt         time.Time `db:"updated_at" json:"updated_at"`
}
