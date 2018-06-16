FROM node:10

RUN npm install webpack webpack-cli nodemon -g

WORKDIR /tmp
COPY package.json /tmp/
RUN npm config set registry http://registry.npmjs.org/ && npm install

WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN cp -a /tmp/node_modules /usr/src/app/

RUN webpack

ENV PORT=4000

CMD [ "node", "usr/src/app/src/server/index.js" ]
EXPOSE 4000