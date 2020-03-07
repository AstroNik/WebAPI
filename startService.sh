#! /bin/sh

./build.sh
echo ""
kubectl apply -f ./k8s/webservice-deployment-bg.yaml
kubectl apply -f ./k8s/webservice-service.yaml