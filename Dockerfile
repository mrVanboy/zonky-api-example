FROM node:10.3-alpine as build-env

COPY ./package.json ./package-lock.json /

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /app && cp -R ./node_modules ./app

COPY . /app
WORKDIR /app

RUN $(npm bin)/ng build --prod --build-optimizer --output-path /app/dist

# ++++++++++++++++++++++++++++
FROM nginx:1.14-alpine
MAINTAINER Ivan Boyarkin <ivan@boyarkin.me>
COPY --from=build-env /app/dist /usr/share/nginx/html

