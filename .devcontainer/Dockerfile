# Ruby 3.1: Gemfile.lock pins liquid 4.0.3, which breaks on Ruby >= 3.2
FROM ruby:3.1-bookworm

WORKDIR /srv/site
COPY Gemfile Gemfile.lock ./
RUN bundle install

EXPOSE 4000 35729
