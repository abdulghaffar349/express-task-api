pipeline {
    agent any
    
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