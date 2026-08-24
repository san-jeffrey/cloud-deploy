pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Docker Build') {
            steps {
                bat 'docker build -t sanjeffrey/cloud-deploy:%BUILD_NUMBER% .'
            }
        }

        stage('Docker Test') {
            steps {
                bat 'docker image inspect sanjeffrey/cloud-deploy:%BUILD_NUMBER%'
            }
        }

        stage('Docker Push') {
    steps {
        withCredentials([usernamePassword(
            credentialsId: 'dockerhub-creds',
            usernameVariable: 'DOCKER_USERNAME',
            passwordVariable: 'DOCKER_PASSWORD'
        )]) {
            bat 'docker login -u "%DOCKER_USERNAME%" -p "%DOCKER_PASSWORD%"'
            bat 'docker push sanjeffrey/cloud-deploy:%BUILD_NUMBER%'
        }
    }
}

        stage('Deploy') {
            steps {
                echo 'Deployment stage will be configured next.'
            }
        }
    }
}