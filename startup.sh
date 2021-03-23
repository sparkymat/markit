#!/bin/bash

set -e

rm -f /myapp/tmp/pids/server.pid

bundle exec rails db:migrate

exec "$@"
