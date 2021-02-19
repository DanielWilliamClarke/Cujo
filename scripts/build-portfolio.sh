#!/bin/bash

IMAGE=$1

# Build: Prod
docker build -f portfolio/Dockerfile -t $IMAGE --build-arg BUILD_MODE=":prod" ./portfolio

# Push image
docker push $IMAGE