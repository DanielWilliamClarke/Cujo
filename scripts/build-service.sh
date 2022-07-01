#!/bin/bash

REGISTRY=$1
IMAGE=$2

# Build: Prod
docker build --platform linux/amd64 -f service/Dockerfile -t $REGISTRY/$IMAGE ./service

# Push image
docker push $REGISTRY/$IMAGE