#!/usr/bin/env bash

if ! docker network ls | grep -q 'codearena-network'; then
    echo "creating codearena-network..."
    docker network create codearena-network
fi

if [[ $1 == 'rabbitmq' ]]; then
  docker run -it --network codearena-network --rm --name rabbitmq-service -d -p 5672:5672 -p 15672:15672 rabbitmq:4.0-management
fi

if [[ $1 == 'redis' ]]; then
  docker run -d --name redis-service --network codearena-network -p 6379:6379 -p 8001:8001 redis/redis-stack:6.2.6-v17
fi

if [[ $1 == 'build' ]]; then
  docker build -t rce-dev -f Dockerfile.dev .
fi

if [[ $1 == 'run' ]]; then  
  docker run --network codearena-network -v ./:/app -v /var/run/docker.sock:/var/run/docker.sock rce-dev:latest
fi

if [[ $1 == 'build:prod' ]]; then
  docker build -t rce-prod .
fi

if [[ $1 == 'run:prod' ]]; then
  docker run --network codearena-network -v ./temp_code:/app/temp_code -v /var/run/docker.sock:/var/run/docker.sock rce-prod:latest
fi
