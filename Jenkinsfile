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
            bat 'echo %DOCKER_PASSWORD%| docker login -u "%DOCKER_USERNAME%" --password-stdin'
            bat 'docker push sanjeffrey/cloud-deploy:%BUILD_NUMBER%'
        }
    }
}

        stage('Deploy') {
    steps {
        bat 'docker stop cloud-web || exit /b 0'
        bat 'docker rm cloud-web || exit /b 0'
        bat 'docker run -d --name cloud-web -p 8080:80 sanjeffrey/cloud-deploy:%BUILD_NUMBER%'
    }
}
    }
}