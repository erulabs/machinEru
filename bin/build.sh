#!/bin/bash

TAG=${1:-$(git rev-parse --short HEAD)}

set -e

echo "Building machinEru:${TAG}"

docker build -t machinEru:${TAG} .
docker tag machinEru:${TAG} machinEru:latest
