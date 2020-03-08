node {
   stage('Preparation') { // for display purposes
      // Get some code from a GitHub repository
      checkout scm
      git clone 'https://github.com/AstroNik/WebAPI.git'
   }
   stage('Build') {
      sh 'docker build -t astronik/webservice:0.1 .'
   }
   stage('Docker Push')
   withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'dockerhub',
                    usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']])
   {
      sh 'docker login --username=$USERNAME --password=$PASSWORD' 
      sh 'docker push astronik/webservice:0.1'
   }
}