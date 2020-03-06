#! /bin/sh

./build.sh
echo ""
kubectl apply -f ./k8s/webservice-deployment.yaml
kubectl apply -f ./k8s/webservice-service.yaml