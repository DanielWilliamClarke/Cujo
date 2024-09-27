#!/bin/bash

DEPLOYMENT=$1
FULL=$2

ENVFILE=/opt/Cujo/.env
COMPOSEFILE=$DEPLOYMENT.compose.yaml

# Deploy
docker-compose --env-file $ENVFILE -f $COMPOSEFILE down $FULL
