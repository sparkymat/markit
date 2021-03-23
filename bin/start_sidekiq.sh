#!/bin/bash
cd /app
bundle install
bundle exec sidekiq
