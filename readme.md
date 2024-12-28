# CodeArena

building an application similar to leetcode end to end

## deploying in k8s

- next.js app pod, load balancer
- redis pod
- rabbitmq pod
- volumes and pvc for redis and rabbitmq so even if the server goes down
  data won't be lost;
- worker pods (including horizontal pod scaling)
- a domain name and ssl certificate for the load balancer

## challenges deploying on k8s

1. mounting the docker runtime, of the node inside the worker container will be challenging
2. mounting volumes on redis and rabbitmq for persistent data, but there were issues
   with rabbitmq not using the old queue data, when it is restarted
