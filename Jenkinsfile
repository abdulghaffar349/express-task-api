pipeline {
    agent any
    
    // environment {
    //     DOCKER_IMAGE = 'express-rest-api'
    //     DOCKER_TAG = "${env.BUILD_NUMBER}"
    //     SONAR_HOST_URL = 'http://sonarqube:9000'
    //     SONAR_LOGIN = credentials('sonar-token')
    //     DOCKER_REGISTRY = 'localhost:5000'  // Change to your registry if needed
    // }
    
    stages {
        stage('Checkout') {
            steps {
                // Clean workspace before checkout
                cleanWs()
                
                // Checkout code from your repository
                checkout scm
                
                // Print repository and branch info
                sh 'git log -1'
                sh 'ls -la'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }
    }
    
    post {
        always {
            // Clean up workspace
            cleanWs()            
        }
        
        success {
            echo 'Pipeline completed successfully!'
        }
        
        failure {
            echo 'Pipeline failed!'
        }
    }
}