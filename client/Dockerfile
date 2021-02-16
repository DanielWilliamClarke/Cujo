#BUILD -----------------------------------
FROM node:15.8.0 as build

WORKDIR /client

COPY package.json /client/package.json

RUN yarn install && yarn add create-react-app 

COPY . /client

RUN ls &&  yarn run build

#RELEASE -----------------------------------
FROM nginx:1.9.15

COPY --from=build /client/build /usr/share/nginx/html

EXPOSE 80

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

# Copy env configs
COPY ./env.sh /usr/share/nginx/html
COPY .env /usr/share/nginx/html
RUN apt-get update -y && \
    apt-get install dos2unix -y && \
    dos2unix /usr/share/nginx/html/env.sh && \
    chmod +x /usr/share/nginx/html/env.sh

# Start Nginx server
CMD ["/bin/bash", "-c", "pwd && ls /usr/share/nginx/html && /usr/share/nginx/html/env.sh && ls /usr/share/nginx/html && nginx -g \"daemon off;\""]
