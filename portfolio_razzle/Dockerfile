#BUILD -----------------------------------
FROM node:16.15.0-alpine as build

ARG BUILD_MODE

WORKDIR /portfolio

COPY package.json /portfolio/package.json

RUN apk add git
RUN npm set unsafe-perm true
RUN npm install --legacy-peer-deps

COPY . /portfolio

RUN npm run build -- --noninteractive

#RELEASE -----------------------------------
FROM node:16.15.0-alpine as release

# RUN chown nginx:nginx /usr/share/nginx/html/*

WORKDIR /portfolio

COPY --from=build /portfolio/build .

EXPOSE 3000

# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx/nginx.conf /etc/nginx/conf.d

# Start Nginx server
# CMD ["/bin/sh", "-c", "echo \"Starting Portfolio...\" && nginx -g \"daemon off;\""]

CMD [ "node", "build/server.js" ]