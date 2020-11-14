-- +goose Up
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    username text NOT NULL UNIQUE,
    email text NOT NULL UNIQUE,
    encrypted_password text NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
    );

-- +goose Down
DROP TABLE users;
DROP EXTENSION IF EXISTS "uuid-ossp";
