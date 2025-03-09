pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'express-rest-api'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        SONAR_HOST_URL = 'http://sonarqube:9000'
        SONAR_LOGIN = credentials('sonar-token-under-domain')
        DOCKER_REGISTRY = 'localhost:5000'  // Change to your registry if needed
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout code from your repository
                checkout scm

                // Print repository and branch info
                sh 'git log -1'
                sh 'ls -la'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh '''
                        npm install -g sonarqube-scanner
                        sonar-scanner \
                            -Dsonar.projectKey=express-rest-api \
                            -Dsonar.projectName='Express REST API' \
                            -Dsonar.sources=. \
                            -Dsonar.tests=tests \
                            -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                            -Dsonar.exclusions=node_modules/**,coverage/**,tests/** \
                            -Dsonar.host.url=${SONAR_HOST_URL} \
                            -Dsonar.login=${SONAR_LOGIN}
                    '''
                }
            }
        }

		stage('Quality Gate') {
			steps {
				timeout(time: 5, unit: 'MINUTES') {
					 waitForQualityGate abortPipeline: true
				}
			}
		}
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed!'
        }
    }
}