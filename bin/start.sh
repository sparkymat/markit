#!/bin/bash
cd /app
bundle install
bundle exec rails db:migrate
bundle exec rails webpacker:compile
bundle exec rails s -b "0.0.0.0"
