pipeline {
    agent any
    parameters {
        string(name: 'ENV_TAG', defaultValue: 'dev')
        string(name: 'DOCKER_ENV', defaultValue: 'staging')
        string(name: 'VUE_APP_OWNER_URL', defaultValue: 'https://gate.sendyit.com/solr/ownerstaging/')
    }
    environment {

           APP_NAME = "buyer-fulfillment"
           IMAGE_BASE_NAME = "${CI_REGISTRY}/${APP_NAME}"
    }

    stages {
        stage('Lint') {
            agent { docker { image 'node:14.18.1-alpine' } }
            
            steps {
                          
                sh '''
                    sudo chown -R 113:118 "/.npm"
                    npm i eslint
                    npm run lint
                '''

            }            
        }

        stage('Unit Test') {
            agent { docker { image 'node:14.18.1-alpine' } }
            steps {

                sh '''
                    npm i mocha
                    npm i nyc
                    npm run test:unit
                '''
            }
        }

        stage('Docker Build & Push Image') {
            steps {
              script {
                
                    if(env.BRANCH_NAME == "master") {

                        env.ENV_TAG = "prod"
                        env.DOCKER_ENV = "production"
                        env.VUE_APP_OWNER_URL = "https://gate.sendyit.com/solr/owner/"

                    } else if (env.BRANCH_NAME == "beta") {

                        env.ENV_TAG = "beta"
                        env.DOCKER_ENV = "beta"
                        env.VUE_APP_OWNER_URL = "https://gate.sendyit.com/solr/owner/"

                    }else {

                        env.ENV_TAG = "dev"
                        env.DOCKER_ENV = "testing"
                        env.VUE_APP_OWNER_URL = "https://gate.sendyit.com/solr/ownerstaging/"

                    }
            }

                sh '''

                    IMAGE_TAG="$ENV_TAG_$(date +%Y-%m-%d-%H-%M)"
                    IMAGE_NAME="${IMAGE_BASE_NAME}:${IMAGE_TAG}"
                    docker build --build-arg DOCKER_ENV="${DOCKER_ENV}" --build=arg VUE_APP_OWNER_SEARCH="${VUE_APP_OWNER_URL}" VUE_APP_ENVIRONMENT="${DOCKER_ENV}" --build-arg VUE_APP_SENTRY_DSN="https://d017eeb1a2594094a9c30753d9e0b6bb@o32379.ingest.sentry.io/5922214" --build-arg VUE_APP_NODE_PRIVATE_URL="https://auth.sendyit.com/v1/" --build-arg VUE_APP_AUTH_URL="https://auth.sendyit.com/" --build-arg VUE_APP_ADONIS_URL="https://auth.sendyit.com/adonis/" --build-arg VUE_APP_CUSTOMERS_URL="https://auth.sendyit.com/customers/" --build-arg VUE_APP_PARTNERS_URL="https://auth.sendyit.com/partners/" --build-arg VUE_APP_ORDERS_URL="https://auth.sendyit.com/orders/" --pull -t $IMAGE_NAME -f Dockerfile .
                    docker push $IMAGE_NAME

                '''
              }
        }
    }
}
