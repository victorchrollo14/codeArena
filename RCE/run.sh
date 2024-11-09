#!/usr/bin/env bash

if [[ $1 == 'rabbitmq' ]]; then
  docker run -it --network rce-network --rm --name rabbitmq -d -p 5672:5672 -p 15672:15672 rabbitmq:4.0-management
fi

if [[ $1 == 'build' ]]; then
  docker build -t rce .
fi

if [[ $1 == 'run' ]]; then
  docker run --network rce-network -v ./:/app -v /var/run/docker.sock:/var/run/docker.sock rce:latest
fi
