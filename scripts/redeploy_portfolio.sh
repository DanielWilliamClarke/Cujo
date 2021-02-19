#!/bin/bash

IMAGE=$1
SERVICE=$2
ENVFILE=/opt/Cujo/.env
COMPOSEFILE=prod.compose.yaml

# Build image without downtime
sudo docker pull $IMAGE

# Tear down image to redeploy
sudo docker-compose --env-file $ENVFILE -f $COMPOSEFILE stop $SERVICE
# up new image
sudo docker-compose --env-file $ENVFILE -f $COMPOSEFILE up -d $SERVICE