# Refactored Udagram App into Microservices

Udagram is a simple cloud application developed alongside the Udacity Cloud Engineering Nanodegree. It allows users to register and log into a web client, post photos to the feed, and process photos using an image filtering microservice.

The project is split into four parts:

1. [The Deployment Handler](https://github.com/stephanenoutsa/udacity/tree/master/course-03/exercises/udacity-c3-deployment), which manages deployment of the application to Kubernetes.
2. [The Simple Frontend](https://github.com/stephanenoutsa/udacity/tree/master/course-03/exercises/udacity-c3-frontend)
   A basic Ionic client web application which consumes the RestAPI Backend.
3. [The RestAPI Backend User Microservice](https://github.com/stephanenoutsa/udacity/tree/master/course-03/exercises/udacity-c3-restapi-user), a Node-Express microservice which manages users and can be deployed to a cloud service.
4. [The RestAPI Backend Feed Microservice](https://github.com/stephanenoutsa/udacity/tree/master/course-03/exercises/udacity-c3-restapi-feed), a Node-Express microservice which manages feeds and can be deployed to a cloud service.

## Tasks

### Create Docker Images

#### Reverse Proxy Image

1. Navigate to the udacity-c3-deployment/docker directory.
2. Build a docker image of the reverseproxy with `docker build -t {your_docker_hub_username}/reverseproxy .`

#### Backend User Image

1. Navigate to the udacity-c3-restapi-user/ directory.
2. Build a docker image of the backend user microservice with `docker build -t {your_docker_hub_username}/udacity-restapi-user .`

#### Backend Feed Image

1. Navigate to the udacity-c3-restapi-feed/ directory.
2. Build a docker image of the backend feed microservice with `docker build -t {your_docker_hub_username}/udacity-restapi-feed .`

#### Frontend Image

1. Navigate to the udacity-c3-frontend/ directory.
2. Build a docker image of the frontend with `docker build -t {your_docker_hub_username}/udacity-frontend .`

### Publish Images to Docker Hub

1. Publish the reverseproxy image with `docker push {your_docker_hub_username}/reverseproxy`.
2. Publish the backend user image with `docker push {your_docker_hub_username}/udacity-restapi-user`.
3. Publish the backend feed image with `docker push {your_docker_hub_username}/udacity-restapi-feed`.
4. Publish the backend feed image with `docker push {your_docker_hub_username}/udacity-frontend`.

### Deploy to Kubernetes Cluster

1. Navigate to the udacity-c3-deployment/k8s/ directory.
2. Modify the configuration values in aws-secret.yaml, env-configmap.yaml, env-secret.yaml.
3. Set the correct docker hub username in the backend-feed-deployment.yaml, backend-user-deployment.yaml, frontend-deployment.yaml, reverseproxy-deployment.yaml files.
4. Repeat step 3 for the docker-compose-build.yaml and docker-compose.yaml files in the udacity-c3-deployment/docker/ directory.
5. Deploy to Kubernetes cluster with `kubectl apply -f {file_name}.yaml` for each file in this directory.

### Start App As Container On Local System

1. Navigate to the udacity-c3-deployment/docker/ directory.
2. Boot up images with `docker-compose up`.
