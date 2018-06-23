FROM node:10

RUN npm install nodemon -g

WORKDIR /tmp
COPY package.json /tmp/
RUN npm config set registry https://registry.npmjs.org/
RUN npm install

WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN cp -a /tmp/node_modules /usr/src/app/

ENV PORT=4000

ENV MONGOHOST=localhost
ENV MONGOPORT=27017

CMD [ "npm", "run", "start:prod" ]
EXPOSE 4000