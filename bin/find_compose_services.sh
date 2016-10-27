#!/bin/bash

# If you're using docker-machine, override host and dockerhost addresses
DOCKER_SRV="127.0.0.1"
DOCKER_MACHINE_HOST=$(docker-machine ip 2> /dev/null)
if [ $? -eq 0 ]; then
  DOCKER_SRV=${DOCKER_MACHINE_HOST}
fi

PROJECT_NAME="machineru"

REDIS_CACHE_PORT="$(docker inspect ${PROJECT_NAME}_redis_1 | jq '.[0].NetworkSettings.Ports["6379/tcp"][0].HostPort' | tr -d '"')"
MYSQL_PORT="$(docker inspect ${PROJECT_NAME}_mysql_1 | jq '.[0].NetworkSettings.Ports["3306/tcp"][0].HostPort' | tr -d '"')"
STATSD_PORT="$(docker inspect ${PROJECT_NAME}_statsd_1 | jq '.[0].NetworkSettings.Ports["8125/udp"][0].HostPort' | tr -d '"')"
STATSD_WEB_PORT="$(docker inspect ${PROJECT_NAME}_statsd_1 | jq '.[0].NetworkSettings.Ports["80/tcp"][0].HostPort' | tr -d '"')"
