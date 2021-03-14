#!/bin/bash

set -e

rm -f /myapp/tmp/pids/server.pid

#exec "bundle exec rails db:migrate"

exec "$@"
