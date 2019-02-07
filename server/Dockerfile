#BASE -----------------------------------
FROM node:10-alpine as serverBase

WORKDIR /usr/src/app
COPY package.json .

#DEPENDENCIES -----------------------------------
FROM serverBase as serverDependencies

# copy production node_modules aside
RUN npm install --only=production 
RUN cp -R node_modules prod_node_modules

RUN npm install --only=dev

#RELEASE -----------------------------------
FROM serverBase AS serverRelease

RUN npm install nodemon -g

COPY --from=serverDependencies /usr/src/app/prod_node_modules ./node_modules

COPY src /usr/src/app/src
COPY index.js /usr/src/app
COPY package.json /usr/src/app
COPY server.env /usr/src/app

ENV PORT=4000
ENV MONGOHOST=localhost
ENV MONGOPORT=27017
EXPOSE 4000

CMD ["npm", "run", "start:prod"]