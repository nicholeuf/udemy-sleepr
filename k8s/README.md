## Kubernetes

## Prerequisites

Before getting started, you should have the following installed

1. [Google Cloud CLI](https://cloud.google.com/sdk/docs/install-sdk)
2. Docker Desktop

## Setup

### Setup Heml and Kubernetes

1. [Install and turn on Kubernetes](https://docs.docker.com/desktop/kubernetes/#install-and-turn-on-kubernetes) from Docker Desktop
2. [Install Helm](https://helm.sh/docs/intro/install/#helm)

### Setup Google Cloud

1. [Setup Google Cloud Service Account Username/Password](https://developers.google.com/workspace/guides/create-credentials#service-account)
2. Download the credentials as JSON and cd into the directory where they are stored
3. Save the credentials as a kubernetes secret by typing the following `kubectl create secret docker-registry gcr-json-key --docker-server=us-east4-docker.pkg.dev --docker-username=_json_key --docker-password="$(cat <FILE>)" --docker-email=<EMAIL>`
4. Patch the service account by typing `kubectl patch serviceaccount default -p '{"imagePullSecrets": [{"name": "gcr-json-key"}]}'`

### Connect Atlas Mongodb

1. [Get connection string from Atlas](https://www.mongodb.com/docs/guides/atlas/connection-string/)
2. Add connection string as a kubernetes secret by typing `kubectl create secret generic mongodb --from-literal=<CONNECTION_STRING>`

### Add secrets to kubernetes cluster

1. Add google secrets as a kubernetes by typing `kubectl create secret generic google --from-literal=clientSecret=<CLIENT_SECRET> --from-literal=refreshToken=<REFRESH_TOKEN`
2. Add smtp email as a kubernetes secret by typing `kubectl create secret generic smtp --from-literal=user=<SMTP_USER>`

### Using sleepr

- To install sleepr, type the following `helm install sleepr ./sleepr`. This should only need to be done once.
- To upgrade sleepr, type the following `helm upgrade sleepr ./sleepr`
- To view the pods, type the following: `kubectl get po`
- To view the services, type the following: `kubectl get svc`
