pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'express-rest-api'
        DOCKER_TAG = "${env.BUILD_NUMBER}"
        SONAR_HOST_URL = 'http://sonarqube:9000'
        SONAR_LOGIN = credentials('sonar-token')
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
                timeout(time: 10, unit: 'MINUTES') {
                    script {
                        def qualityGate = waitForQualityGate()
                        if (qualityGate.status != 'OK'){
                            error "Pipeline aborted due to Quality Gate failure: ${qualityGate.status}"
                            }
                        }
                    }
                }
        }

        // stage('Build Docker Image') {
        //     steps {
        //         sh 'docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .'
        //         sh 'docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG}'
        //         sh 'docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:latest'
        //     }
        // }

            // stage('Push Docker Image') {
            //     steps {
            //         sh 'docker push ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG}'
            //         sh 'docker push ${DOCKER_REGISTRY}/${DOCKER_REGISTRY}/${DOCKER_IMAGE}:latest'
            //     }
            // }
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