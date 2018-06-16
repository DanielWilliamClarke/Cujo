FROM node:10

RUN npm install webpack webpack-cli -g

WORKDIR /tmp
COPY package.json /tmp/
RUN npm config set registry https://registry.npmjs.org/
RUN npm install

WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN cp -a /tmp/node_modules /usr/src/app/

RUN webpack

ENV PORT=4000

CMD [ "npm", "run", "start:prod" ]
EXPOSE 4000