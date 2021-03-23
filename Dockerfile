FROM ruby:3.0.0-slim

RUN apt-get update -qq && apt-get install -y nodejs npm make gcc g++ postgresql-client libpq-dev
WORKDIR /app
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
RUN bundle install
RUN npm install --global yarn

COPY . /app
RUN yarn

COPY bin/start.sh /usr/bin
RUN chmod +x /usr/bin/start.sh
EXPOSE 3000

ENTRYPOINT ["start.sh"]
