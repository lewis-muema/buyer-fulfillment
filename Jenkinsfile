pipeline {
    agent any
    environment {

           APP_NAME = "buyer-fulfillment"
           IMAGE_BASE_NAME = "${CI_REGISTRY}/${APP_NAME}"
    }

    stages {
        stage('Lint Test') {
            agent {
                docker {
                    image 'node:14-alpine'
                    args '--user root'
                }
            }
            steps {

                sh '''
                    id
                    npm i eslint
                    npm run lint
                '''

            }
        }
        stage('Unit Test') {
            agent { 
                docker { 
                    image 'cypress/base:14.16.0'
                    args '--user=root'
                } 
            } 
            steps {
                cache(maxCacheSize: 900, caches: [
                arbitraryFileCache(path: '/var/lib/jenkins/caches/Cypress,.npm',compressionMethod: 'NONE')
                ]) {
                    sh '''
                         npm install istanbul
                         npm ci --prefer-offline
                         npx cypress cache path
                         npx cypress cache list
                         npm run test
                         npm run coverage
                    '''
                }    
            }
            post {
                always {
                  publishHTML target: [
                    allowMissing         : false,
                    alwaysLinkToLastBuild: false,
                    keepAll             : true,
                    reportDir            : 'coverage/lcov-report',
                    reportFiles          : 'index.html',
                    reportName           : 'Coverage Report - HTML'
                  ]
                  recordCoverage(tools: [[parser: 'COBERTURA']],
                    sourceDirectories: [[path: 'coverage/**.xml']],
                    id: 'COBERTURA-COVERAGE-REPORT-FULFILMENT-BUYER-WEB-APP', name: 'COBERTURA COVERAGE REPORT'
                  )
                  catchError(buildResult: 'SUCCESS', stageResult: 'SUCCESS') {
                    junit "test-results/**.xml"  
                }
              }
           }
        }
        stage('Docker Build Staging') {      
            when {
                branch 'staging'
             }
            steps {      
                    sh '''            
                        export ENV_TAG="dev"
                        export DOCKER_ENV="staging"
                        export VUE_APP_OWNER_URL="https://gate.sendyit.com/solr/ownerstaging/"
                        export NODE_PRIVATE_URL="https://authtest.sendyit.com/v1/"
                        export AUTH_URL="https://authtest.sendyit.com/"
                        export ADONIS_URL="https://authtest.sendyit.com/adonis/"
                        export CUSTOMERS_URL="https://authtest.sendyit.com/customers/"
                        export PARTNERS_URL="https://authtest.sendyit.com/partners/"
                        export ORDERS_URL="https://authtest.sendyit.com/orders/"
                        IMAGE_TAG="${ENV_TAG}_$(date +%Y-%m-%d-%H-%M)"
                        IMAGE_NAME="${IMAGE_BASE_NAME}:${IMAGE_TAG}"
                        docker build -t $IMAGE_NAME . \
                        --build-arg DOCKER_ENV="staging" \
                        --build-arg VUE_APP_OWNER_SEARCH="${VUE_APP_OWNER_URL}" \
                        --build-arg VUE_APP_ENVIRONMENT="${DOCKER_ENV}" \
                        --build-arg VUE_APP_SENTRY_DSN="${SENTRY_DSN}" \
                        --build-arg VUE_APP_NODE_PRIVATE_URL="${NODE_PRIVATE_URL}" \
                        --build-arg VUE_APP_AUTH_URL="${AUTH_URL}" \
                        --build-arg VUE_APP_ADONIS_URL="${ADONIS_URL}" \
                        --build-arg VUE_APP_CUSTOMERS_URL="${CUSTOMERS_URL}" \
                        --build-arg VUE_APP_PARTNERS_URL="${PARTNERS_URL}" \
                        --build-arg VUE_APP_ORDERS_URL="${ORDERS_URL}"
                        docker push $IMAGE_NAME
                        '''
            }
       }
        stage('Docker Build pre-prod') {
            when {
                branch 'pre-prod'
             }
            steps {
                sh '''
                        export ENV_TAG="staging"
                        export DOCKER_ENV="preprod"
                        export VUE_APP_OWNER_URL="https://auth.sendy.tech/solr/owner/"
                        export NODE_PRIVATE_URL="https://authtest.sendy.tech/v1/"
                        export AUTH_URL="https://auth.sendy.tech/"
                        export ADONIS_URL="https://auth.sendy.tech/adonis/"
                        export CUSTOMERS_URL="https://auth.sendy.tech/customers/"
                        export PARTNERS_URL="https://auth.sendy.tech/partners/"
                        export ORDERS_URL="https://auth.sendy.tech/orders/"
                        IMAGE_TAG="${ENV_TAG}_$(date +%Y-%m-%d-%H-%M)"
                        IMAGE_NAME="${IMAGE_BASE_NAME}:${IMAGE_TAG}"
                        docker build -t $IMAGE_NAME . \
                        --build-arg DOCKER_ENV="preprod" \
                        --build-arg VUE_APP_OWNER_SEARCH="${VUE_APP_OWNER_URL}" \
                        --build-arg VUE_APP_ENVIRONMENT="${DOCKER_ENV}" \
                        --build-arg VUE_APP_SENTRY_DSN="${SENTRY_DSN}" \
                        --build-arg VUE_APP_NODE_PRIVATE_URL="${NODE_PRIVATE_URL}" \
                        --build-arg VUE_APP_AUTH_URL="${AUTH_URL}" \
                        --build-arg VUE_APP_ADONIS_URL="${ADONIS_URL}" \
                        --build-arg VUE_APP_CUSTOMERS_URL="${CUSTOMERS_URL}" \
                        --build-arg VUE_APP_PARTNERS_URL="${PARTNERS_URL}" \
                        --build-arg VUE_APP_ORDERS_URL="${ORDERS_URL}"
                        docker push $IMAGE_NAME
                    '''

            }
        }
        stage('Docker Build Prod') {
             when {
                branch 'master'
             }
            steps {
                    sh '''
                        export ENV_TAG="prod"
                        export VUE_APP_OWNER_URL="https://gate.sendyit.com/solr/owner/"
                        export NODE_PRIVATE_URL="https://authtest.sendyit.com/v1/"
                        export AUTH_URL="https://auth.sendyit.com/"
                        export ADONIS_URL="https://auth.sendyit.com/adonis/"
                        export CUSTOMERS_URL="https://auth.sendyit.com/customers/"
                        export PARTNERS_URL="https://auth.sendyit.com/partners/"
                        export ORDERS_URL="https://auth.sendyit.com/orders/"
                        IMAGE_TAG="prod_$(date +%Y-%m-%d-%H-%M)"
                        IMAGE_NAME="${IMAGE_BASE_NAME}:${IMAGE_TAG}"
                        docker build -t $IMAGE_NAME . \
                        --build-arg DOCKER_ENV="production" \
                        --build-arg VUE_APP_OWNER_SEARCH="${VUE_APP_OWNER_URL}" \
                        --build-arg VUE_APP_ENVIRONMENT="${DOCKER_ENV}" \
                        --build-arg VUE_APP_SENTRY_DSN="${SENTRY_DSN}" \
                        --build-arg VUE_APP_NODE_PRIVATE_URL="${NODE_PRIVATE_URL}" \
                        --build-arg VUE_APP_AUTH_URL="${AUTH_URL}" \
                        --build-arg VUE_APP_ADONIS_URL="${ADONIS_URL}" \
                        --build-arg VUE_APP_CUSTOMERS_URL="${CUSTOMERS_URL}" \
                        --build-arg VUE_APP_PARTNERS_URL="${PARTNERS_URL}" \
                        --build-arg VUE_APP_ORDERS_URL="${ORDERS_URL}"
                        docker push $IMAGE_NAME
                        '''

            }
        }             
    }
  }
