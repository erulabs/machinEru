#!/bin/bash

USAGE="./bin/waitForDocker.sh targetContainer [retries] [delay] [test_output]"
if [ -z "$1" ]; then
  echo $USAGE
  exit
fi
TARGET="$1"
RETRIES=${2:-2}
RETRY_DELAY=${3:-5}
TEST_OUTPUT=${4:-"up and running"}

START_TIME=$(date +%s)
function waitForDocker {
  echo "Waiting for $TARGET..."
  OUTPUT=$(docker logs "${TARGET}" 2>&1 | fgrep "${TEST_OUTPUT}")
  if [ $? -eq 0 ]; then
    echo "Container Ready - Took $(($(date +%s) - $START_TIME)) seconds to boot" && \
    exit 0
  else
    RETRIES=$(($RETRIES-1))
    if [ $RETRIES -eq 0 ]; then
      echo "Container failed to start!"
      exit 1
    else
      echo "Container not up! Retries left: $RETRIES. Waiting $RETRY_DELAY seconds."
      sleep $RETRY_DELAY
      waitForDocker
    fi
  fi
}

waitForDocker
