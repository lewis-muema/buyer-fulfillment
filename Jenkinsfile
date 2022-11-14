pipeline {
    agent any
    parameters {
        string(name: 'ENV_TAG', defaultValue: 'dev')
        string(name: 'DOCKER_ENV', defaultValue: 'staging')
        string(name: 'VUE_APP_OWNER_URL', defaultValue: 'https://gate.sendyit.com/solr/ownerstaging/')
        string(name: 'NODE_PRIVATE_URL', defaultValue: 'https://authtest.sendyit.com/v1/')
        string(name: 'AUTH_URL', defaultValue: 'https://authtest.sendyit.com/')
        string(name: 'ADONIS_URL', defaultValue: 'https://authtest.sendyit.com/adonis/')
        string(name: 'CUSTOMERS_URL', defaultValue: 'https://authtest.sendyit.com/customers/')
        string(name: 'PARTNERS_URL', defaultValue: 'https://authtest.sendyit.com/partners/')
        string(name: 'ORDERS_URL', defaultValue: 'https://authtest.sendyit.com/orders/')
        string(name: 'SENTRY_DSN', defaultValue: 'https://d017eeb1a2594094a9c30753d9e0b6bb@o32379.ingest.sentry.io/5922214')

    }
    environment {

           APP_NAME = "buyer-fulfillment"
           IMAGE_BASE_NAME = "${CI_REGISTRY}/${APP_NAME}"
    }

    stages {
        stage('ES Lint') {
            agent { 
                docker { 
                    image 'node:14.20.0-alpine'
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
                    image 'node:14.18.1-alpine'
                    args '--user root' 
                } 
            }
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
                        env.NODE_PRIVATE_URL = "https://auth.sendyit.com/v1/"
                        env.AUTH_URL = "https://auth.sendyit.com/"
                        env.ADONIS_URL = "https://auth.sendyit.com/adonis/"
                        env.CUSTOMERS_URL = "https://auth.sendyit.com/customers/"
                        env.PARTNERS_URL = "https://auth.sendyit.com/partners/"
                        env.ORDERS_URL = "https://auth.sendyit.com/orders/"


                    } else if (env.BRANCH_NAME == "beta") {

                        env.ENV_TAG = "beta"
                        env.DOCKER_ENV = "beta"
                        env.VUE_APP_OWNER_URL = "https://gate.sendyit.com/solr/owner/"
                        env.NODE_PRIVATE_URL = "https://authtest.sendyit.com/v1/"
                        env.AUTH_URL = "https://auth.sendyit.com/"
                        env.ADONIS_URL = "https://auth.sendyit.com/adonis/"
                        env.CUSTOMERS_URL = "https://auth.sendyit.com/customers/"
                        env.PARTNERS_URL = "https://auth.sendyit.com/partners/"
                        env.ORDERS_URL = "https://auth.sendyit.com/orders/"

                    }else {

                        env.ENV_TAG = "dev"

                    }
            }

                sh '''

                    IMAGE_TAG="$ENV_TAG_$(date +%Y-%m-%d-%H-%M)"
                    IMAGE_NAME="${IMAGE_BASE_NAME}:${IMAGE_TAG}"
                    docker build -t $IMAGE_NAME . \
                    --build-arg DOCKER_ENV="${DOCKER_ENV}" \
                    --build-arg VUE_APP_OWNER_SEARCH="${VUE_APP_OWNER_URL}" \
                    --build-arg VUE_APP_ENVIRONMENT="${DOCKER_ENV}" \
                    --build-arg VUE_APP_SENTRY_DSN="${SENTRY_DSN}" \
                    --build-arg VUE_APP_NODE_PRIVATE_URL="${NODE_PRIVATE_URL}" \
                    --build-arg VUE_APP_AUTH_URL="${AUTH_URL}" \
                    --build-arg VUE_APP_ADONIS_URL="${ADONIS_URL}" \
                    --build-arg VUE_APP_CUSTOMERS_URL="${CUSTOMERS_URL}" \
                    --build-arg VUE_APP_PARTNERS_URL="${PARTNERS_URL}" \
                    --build-arg VUE_APP_ORDERS_URL="${ORDERRS_URL}"
                    docker push $IMAGE_NAME

                '''
              }
        }
    }
}
