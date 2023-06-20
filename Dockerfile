FROM sendy-docker-local.jfrog.io/node:16.14.0-alpine AS build-stage

WORKDIR /build

ARG DOCKER_ENV

ENV DOCKER_ENV=$DOCKER_ENV
RUN echo ${DOCKER_ENV}

COPY package*.json ./
RUN npm install

COPY . .

RUN if [ "$DOCKER_ENV" = "staging" ]; \
        then npm run staging; \
        elif [ "$DOCKER_ENV" = "beta" ]; \
        then npm run beta; \
        elif [ "$DOCKER_ENV" = "preprod"]; \
        then npm run preprod; \
        else npm run build; \
        fi


#############################
FROM sendy-docker-local.jfrog.io/nginx:base
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/src/app
COPY --from=build-stage --chown=sendy:sendy /build/dist ./

USER sendy:sendy

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]








