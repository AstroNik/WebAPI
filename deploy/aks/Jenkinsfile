node {
   stage('Preparation') { // for display purposes
      // Get some code from a GitHub repository
      git 'https://github.com/AstroNik/WebAPI.git'
   }
   stage('Build') {
      sh 'docker build -t astronik/webservice:${BUILD_ID} .'
   }
   stage('Push') 
   withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'dockerhub',
                    usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']])
   {
      sh 'docker login --username=$USERNAME --password=$PASSWORD' 
      sh 'docker push astronik/webservice:${BUILD_ID}'
   }
   stage('Prepare Scripts') 
   {
      sh 'sed -i \'s/IDTAG/\'${BUILD_ID}\'/g\' deploy/pumrporderdeploy.yaml'
      sh 'sed -i \'s/IDPRETAG/\'$((${BUILD_ID}-1))\'/g\' deploy/pumrporderpredeploy.yaml'
      sh 'sed -i \'s/IDTAG/\'${BUILD_ID}\'/g\' deploy/updategw50.yaml'
      sh 'sed -i \'s/IDPRETAG/\'$((${BUILD_ID}-1))\'/g\' deploy/updategw50.yaml'
      sh 'sed -i \'s/IDTAG/\'${BUILD_ID}\'/g\' deploy/updategw100.yaml'
      sh 'sed -i \'s/IDPRETAG/\'$((${BUILD_ID}-1))\'/g\' deploy/updategw100.yaml'
   } 
   stage('Deploy in Cluster') 
   {
       sh 'curl -v -X POST --data-binary @deploy/pumrporderdeploy.yaml -H "Content-Type: application/x-yaml" 10.20.0.100:8080/api/v1/deployments'
   }
   stage('Move GW 50/50') 
   {
       input 'Do you approve deployment?'
       sh 'curl -v -X PUT --data-binary @deploy/updategw50.yaml -H "Content-Type: application/x-yaml" 10.20.0.100:8080/api/v1/gateways/pumrpapi'
   }
   stage('Move Full') 
   {
       input 'Do you approve deployment?'
       sh 'curl -v -X PUT --data-binary @deploy/updategw100.yaml -H "Content-Type: application/x-yaml" 10.20.0.100:8080/api/v1/gateways/pumrpapi'
   }
   stage('Undeploy Previous App') 
   {
       sh 'curl -v -X DELETE --data-binary @deploy/pumrporderpredeploy.yaml -H "Content-Type: application/x-yaml" 10.20.0.100:8080/api/v1/deployments/pumrporder:$((${BUILD_ID}-1))'
       sh 'curl -v -X DELETE -H "Content-Type: application/x-yaml" 10.20.0.100:8080/api/v1/breeds/pumrporder:$((${BUILD_ID}-1))'

   }
}