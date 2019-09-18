#!/usr/bin/env bash

BASEDIR=$(dirname "$0")
cd $BASEDIR
pwd

# Build front-end
cd picturefront
rm -rf ./build/*
yarn 
yarn build

# Copy front-end files to backend folder
mv build/static/* build/
mkdir -p ../PictureServer/static/img
cp -R build/* ../PictureServer/static/

# Stop old docker
docker stop $(docker ps | grep picserver | awk '{print $1}')
docker rm $(docker ps -a -q)

# Build docker
cd ./../PictureServer
docker build -t picserver .

# Run docker
mkdir -p /temp/www/html/resources
docker run -v /temp/www/html/resources:/static/img --name picserver -d -p 8020:8020 picserver:latest &
docker image prune -f


