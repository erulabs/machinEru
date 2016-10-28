#!/bin/bash

if ! [ -x "$(command -v jq)" ]; then
  echo "Please install 'jq' - brew install jq, apt install jq..."; exit 1
elif ! [ -x "$(command -v yarn)" ]; then
  echo "Please install 'yarn' - sudo npm install -g yarn"; exit 1
elif ! [ -f "package.json" ]; then
  echo "This script needs to be run from the root of the repository"; exit 1
elif ! [ -f "env.plain" ]; then
  echo "You're missing an env.plain file"; exit 1
fi
if ! [ -d "node_modules" ]; then
  yarn
fi

set -o allexport
source env.plain
set +o allexport
set +e

export NODE_ENV=development

mkdir -p ./_db
chmod -R 777 _db

COMPOSE_CMD="docker-compose up -d --remove-orphans"
${COMPOSE_CMD} redis mysql statsd > /dev/null

. ./bin/find_compose_services.sh

set -x

REDIS_URIS="${DOCKER_SRV}:${REDIS_PORT}" \
MYSQL_URIS="${DOCKER_SRV}:${MYSQL_PORT}" \
STATSD_URIS="${DOCKER_SRV}:${STATSD_PORT}" \
NODE_NAME="dev" \
BLUEBIRD_WARNINGS=0 \
./node_modules/.bin/gulp watch
