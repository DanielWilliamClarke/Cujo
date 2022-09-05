#BUILD -----------------------------------
FROM node:14.20.0-alpine as build

ARG BUILD_MODE

WORKDIR /portfolio

COPY package.json /portfolio/package.json

RUN apk add git
RUN npm set unsafe-perm true
RUN npm install

COPY . /portfolio

RUN npm run build$BUILD_MODE

#RELEASE -----------------------------------
FROM nginx:1.21.0-alpine

RUN chown nginx:nginx /usr/share/nginx/html/*

WORKDIR /usr/share/nginx/html

COPY --from=build /portfolio/build .

EXPOSE 8080

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

# Start Nginx server
CMD ["/bin/sh", "-c", "echo \"Starting Portfolio...\" && nginx -g \"daemon off;\""]
