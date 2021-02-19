#!/bin/bash

# Tear down image to redeploy
sudo docker-compose -f prod.compose.yaml stop $1

# build new image
sudo docker-compose -f prod.compose.yaml build $1

# up new image
sudo docker-compose -f prod.compose.yaml up -d $1