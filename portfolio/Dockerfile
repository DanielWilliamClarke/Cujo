#BUILD -----------------------------------
FROM node:15.8.0 as build

WORKDIR /portfolio

COPY package.json /portfolio/package.json

RUN yarn install && yarn add create-react-app 

COPY . /portfolio

RUN yarn run build

#RELEASE -----------------------------------
FROM nginx:1.9.15

WORKDIR /usr/share/nginx/html

COPY --from=build /portfolio/build .
COPY --from=build /portfolio/env.sh .
COPY --from=build /portfolio/app.env .

EXPOSE 80

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

# Start Nginx server
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
