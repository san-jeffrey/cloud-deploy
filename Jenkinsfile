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
                echo 'Docker push will be configured with Jenkins credentials next.'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deployment stage will be configured next.'
            }
        }
    }
}