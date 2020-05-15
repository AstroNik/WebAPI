# WebAPI


In order to access the Kubernetes Cluster running on Digital Ocean. First download the file from our slack channel (ecoders-kubeconfig.yaml)

Go to your user Folder C:\Users\YourName\.kube

Open the config file using Notepad++ (regular notepad sucks you might lose the file formatting)

Copy in the contents of the file under its respective sections making sure to follow your current file.

After saving and closing the document you should be able to access the cluster.

In gitbash or cmd prompt run "**kubectl config get-contexts**" and then run "**kubectl config use-context do-sfo2-ecoders**"

The first command allows you to view all differnt contexts that you have access to. The second command allows you to use the context.

In order to view data logs for our application run "**kubectl get pods**" this will give you all the pods running.

Find the pod that starts with the name **ecoders-webapi**, copy the entire name and the run the command "**kubectl logs PASTE_POD_NAME**"

