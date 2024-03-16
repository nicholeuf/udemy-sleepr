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
2. Add connection string as a kubernetes secret by typing `kubectl create secret generic mongodb --from-literal=connectionString='<CONNECTION_STRING>'`

### Add secrets to kubernetes cluster

1. Add google secrets by typing `kubectl create secret generic google --from-literal=clientSecret=<CLIENT_SECRET> --from-literal=refreshToken=<REFRESH_TOKEN`
2. Add smtp email by typing `kubectl create secret generic smtp --from-literal=user=<SMTP_USER>`
3. Add stripe api key by typing `kubectl create secret generic stripe --from-literal=apiKey=<STRIPE_API_KEY>`
4. Add JWT secret by typing `kubectl create secret generic jwt --from-literal=jwtSecret=<JWT_SECRET>`

### Editing secrets

The following steps should be used for modifying the mongodb secret, from the [docs](/docs/tasks/configmap-secret/managing-secret-using-kubectl/#edit-secret):

1. Type the following to base64 encode the connection string `echo -n CONNECTION_STRING' | base64`. Make note of the output for step 3 below.
2. Type the following to edit the secret `kubectl edit secrets mongodb`. An editor will be displayed where the secret can be modified.
3. Modify the connectionString value with single quotes around it, '<BASE64_CONNECTION_STRING>'
4. Save the file.
5. Restart the effected apps by typing `kubectl rollout restart deployment reservations`

### Using sleepr

- To install sleepr, type the following `helm install sleepr ./sleepr`. This should only need to be done once.
- To upgrade sleepr, type the following `helm upgrade sleepr ./sleepr`
- To view the pods, type the following: `kubectl get po`
- To view the services, type the following: `kubectl get svc`
