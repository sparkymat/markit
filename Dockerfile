FROM ruby:3.0.0-slim

RUN apt-get update -qq && apt-get install -y nodejs make gcc g++ postgresql-client libpq-dev
WORKDIR /app
COPY Gemfile /app/Gemfile
COPY Gemfile.lock /app/Gemfile.lock
RUN bundle install
COPY . /app

COPY startup.sh /usr/bin
RUN chmod +x /usr/bin/startup.sh
ENTRYPOINT ["startup.sh"]
EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]
