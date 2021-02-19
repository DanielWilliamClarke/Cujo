#!/bin/bash

# Tear down image to redeploy
sudo docker-compose stop $1

# build new image
sudo docker-compose build $1

# up new image
sudo docker-compose up -d $1