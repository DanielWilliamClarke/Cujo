#!/bin/bash

COMPOSEFILE=dev.compose.yaml

# Deploy
docker-compose -f $COMPOSEFILE up -d