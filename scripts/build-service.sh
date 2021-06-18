#!/bin/bash

REGISTRY=$1
IMAGE=$2

# Build: Prod
docker build -f service/Dockerfile -t $REGISTRY/$IMAGE ./service

# Push image
docker push $REGISTRY/$IMAGE