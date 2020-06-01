#! /bin/sh

docker build . -t astronik/webservice:latest


kubectl delete deploy ecoders-webapi
kubectl delete svc ecoders-webapi-service

kubectl apply -f ./k8s/webservicelocal-deployment.yaml
kubectl apply -f ./k8s/webservicelocal-service.yaml