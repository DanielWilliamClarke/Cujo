#!/bin/bash

REGISTRY=$1
IMAGE=$2

# Build: Prod
docker build -f portfolio/Dockerfile -t $REGISTRY/$IMAGE --build-arg BUILD_MODE=":prod" ./portfolio

# Push image
docker push $REGISTRY/$IMAGE