#BUILD -----------------------------------
FROM node:15.8.0 as build

ARG BUILD_MODE

WORKDIR /portfolio

COPY package.json /portfolio/package.json

RUN yarn install --network-timeout 100000

COPY . /portfolio

RUN yarn run build$BUILD_MODE

#RELEASE -----------------------------------
FROM nginx:1.9.15

WORKDIR /usr/share/nginx/html

COPY --from=build /portfolio/build .
COPY --from=build /portfolio/env.sh .
COPY --from=build /portfolio/app.env .

EXPOSE 8080

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

# Start Nginx server
CMD ["/bin/bash", "-c", "echo \"Starting Portfolio...\" && /usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
