#BUILD -----------------------------------
FROM node:16.15.0-alpine as build

WORKDIR /portfolio

COPY package.json /portfolio/package.json

RUN apk add git
RUN npm install --legacy-peer-deps

COPY . /portfolio

#build runtime
RUN npm run build:ci

# only install prod dependencies
RUN rm -rf ./node_modules
RUN npm install --legacy-peer-deps --omit=dev

#RELEASE -----------------------------------
FROM node:16.15.0-alpine as release

WORKDIR /portfolio

COPY --from=build /portfolio/node_modules ./node_modules
COPY --from=build /portfolio/build /portfolio/build

EXPOSE 3000
EXPOSE 3001

CMD [ "node", "./build/server.js" ]