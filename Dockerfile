FROM golang:1.15-alpine

RUN apk update && \
    apk add curl && \
    apk add git && \
    apk add tig && \
    apk add vim && \
    apk add gcc && \
    apk add libc-dev

WORKDIR /go/src/app
COPY . .

RUN go get -u github.com/pressly/goose/cmd/goose
RUN go get -d -v ./...
RUN go install -v ./...

RUN goose -dir "migration" postgres "dbname=$DATABASE_NAME host=$DATABASE_HOST port=$DATABASE_PORT user=$DATABASE_USER password=$DATABASE_PASSWORD sslmode=disable" status

CMD ["markit"]
