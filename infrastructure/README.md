# Infrastructure config for Azure AKS

These files define the configuration required for deploying this application to Azure AKS.

## Local setup

To run the application locally from the Dockerfile defined in the `./infrastructure/docker` directory run;

```
cd infrastructure/docker && docker-compose up
```

To run in a local Kubernetes cluster first ensure you have the Edge version of Docker installed on your local machine and have enabled the local Kubernetes context.

You'll then need a local registry to push to and pull images from, this can be setup with;

```
docker run -d -p 5000:5000 --restart=always --name registry registry:2
```

Using Helm install the Charts defined in `./infrastructure/deployment/charts/app` with the values defined in `./infrastructure/deployment/charts/app/values.dev.yaml`;

```
helm install infrastructure/deployment/charts/app --name react-pwa -f infrastructure/deployment/charts/app/values.dev.yaml
```

Install the NGINX ingress from the Helm registry with;

```
helm install stable/nginx-ingress --name local-nginx
```

Add a host file entry to point `127.0.0.1` to `hn.nearform.local`.

You should now be able to navigate to `http://localhost` in your browser and see the application running.
