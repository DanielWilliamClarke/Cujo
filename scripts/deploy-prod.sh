#!/bin/bash

ENVFILE=/opt/Cujo/.env
COMPOSEFILE=prod.compose.yaml

# Deploy
sudo docker-compose --env-file $ENVFILE -f $COMPOSEFILE up -d