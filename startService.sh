#! /bin/sh

./build.sh
echo ""
kubectl apply -f ./k8s/webservicelocal-deployment.yaml
kubectl apply -f ./k8s/webservice-service.yaml