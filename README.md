# WebAPI

This is our main service that handles everything

---------------------------- Running Locally (no kubernetes) ----------------------------------

The build configuration should be as follows.

Click the + icon when you editing build configuration and select **go build**

Under the configuration section change **RUN KIND** to **Directroy**

Change the directory to the project directory and the same for working directory


---------------------------- Running Locally w/Kubernetes  ----------------------------------

Switch to your local kubernetes context using "**kubectl config get-contexts**" and then run "**kubectl config use-context docker-for-desktop**"

then run the **build.sh** file

---------------------------- CLUSTER ACCESS -----------------------------------

In order to access the Kubernetes Cluster running on Digital Ocean (credentials change every 7 days/ unless you already have access then it's fine). First download the file from our slack channel (ecoders-kubeconfig.yaml)

Go to your user Folder C:\Users\YourName\ .kube folder

Open the config file using Notepad++ (regular notepad sucks you might lose the file formatting)

Copy in the contents of the file under its respective sections making sure to follow your current file.

After saving and closing the document you should be able to access the cluster.

In gitbash or cmd prompt run "**kubectl config get-contexts**" and then run "**kubectl config use-context do-sfo2-ecoders**"

The first command allows you to view all differnt contexts that you have access to. The second command allows you to use the context.

In order to view data logs for our application run "**kubectl get pods**" this will give you all the pods running.

Find the pod that starts with the name **ecoders-webapi**, copy the entire name and the run the command "**kubectl logs PASTE_POD_NAME**"

