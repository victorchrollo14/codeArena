# CodeArena

an application similar to leetcode end to end.

## main components

- next.js for the frontend and backend.
- rabbitmq as a message queue.
- code execution engine in python that uses docker out of docker approach (<https://medium.com/@blogs4devs/implementing-a-remote-code-execution-engine-from-scratch-4a765a3c7303>).
- redis to cache the results after execution, then the next.js app reads from the cache and displays it to the user.

## deploying in k8s

- next.js app pod, load balancer
- redis pod
- rabbitmq pod
- volumes and pvc for redis and rabbitmq so even if the server goes down
  data won't be lost;
- worker pods (including horizontal pod scaling)
- a domain name and ssl certificate for the load balancer

  ![k8s-architecture-codearena](https://github.com/user-attachments/assets/c5edaa0e-ae4b-49a8-a167-0bcc35bf291d)

## challenges deploying on k8s

1. mounting the docker runtime, of the node inside the worker container will be challenging
2. mounting volumes on redis and rabbitmq for persistent data, but there were issues
   with rabbitmq not using the old queue data, when it is restarted

### problems

1. found out that k8s actually uses containerd runtime, instead of docker runtime,
   so can't mount the docker socket of the k8s node into my worker pod since it uses docker-py library.

#### solutions

1. rewrite using containerd
2. create a nfs volume, run a nfs server on a ec2 machine,
   install a container over there and mount the docker socket from the ec2 machine on the k8s pod

3. Replace it with k8s-py library that can use trigger cron jobs run it in a seperate pod with limited resources and then get output.

### k8s to-do

K8s practice tasks using your LeetCode clone

- Containerize Next.js, Python runner, RabbitMQ, Redis (separate images).

- Deploy each as a Deployment + Service.

- Use ConfigMaps for envs, Secrets for creds.

- Add Jobs for code execution workers.

- Implement HPA on workers (queue length / CPU).

- Add Ingress for frontend access.

- Persist Redis with PVC.

- Use readiness/liveness probes.

- Add RBAC: workers only access needed resources.

- Package everything with Helm.
