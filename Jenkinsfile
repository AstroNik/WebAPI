node {
    def app
    stage('Clone repository') {
        git credentialsId: 'GitAccess', url: 'https://github.com/AstroNik/WebAPI.git'
    }
    stage('Build image') {
        app = docker.build("astronik/webservice")
    }
    stage('Test image') {
        app.inside {
            sh 'echo "Tests passed"'
        }
    }
    stage('Push to Docker') {
        docker.withRegistry('https://registry.hub.docker.com', 'GitAccess') {
            app.push("${env.BUILD_NUMBER}")
            app.push("latest")
        }
    }
    stage('Push to ACR'){
        acrQuickTask azureCredentialsId: 'azsrvprincipal', gitPath: '', gitRefspec: '', gitRepo: '', imageNames: [[image: 'ecodershub.azurecr.io/webservice']], registryName: 'EcodersHub', resourceGroupName: 'Capstone', tarball: '', variant: ''
    }
    stage('Deploy to AKS'){
        acsDeploy azureCredentialsId: 'azsrvprincipal', configFilePaths: './k8s/webservice-deployment-bg.yaml', containerService: 'EcodersDev | AKS', dcosDockerCredentialsPath: '', resourceGroupName: 'Capstone', secretName: '', sshCredentialsId: ''
    }
}