#!/bin/bash

DEPLOYMENT=$1
BG=$2

ENVFILE=/opt/Cujo/.env
COMPOSEFILE=$DEPLOYMENT.compose.yaml

# Deploy
docker-compose --env-file $ENVFILE -f $COMPOSEFILE up $BG