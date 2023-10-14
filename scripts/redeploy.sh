#!/bin/bash

IMAGE=$1
SERVICE=$2
DEPLOYMENT=$3

ENVFILE=/opt/Cujo/.env
COMPOSEFILE=$DEPLOYMENT.compose.yaml

# Build image without downtime
docker pull $IMAGE

# Tear down image to redeploy
docker compose --env-file $ENVFILE -f $COMPOSEFILE stop $SERVICE
# up new image
docker compose --env-file $ENVFILE -f $COMPOSEFILE up -d $SERVICE