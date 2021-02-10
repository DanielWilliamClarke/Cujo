#BUILD -----------------------------------
FROM node:15.8.0 as build

WORKDIR /client

COPY package.json /client/package.json

RUN npm install

COPY . /client

RUN npm run build

#RELEASE -----------------------------------
FROM nginx:1.9.15

COPY --from=build /client/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

# Start Nginx server
CMD ["/bin/bash", "-c", "nginx -g \"daemon off;\""]
