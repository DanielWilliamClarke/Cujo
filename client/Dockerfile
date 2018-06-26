#BASE -----------------------------------
FROM node:10-alpine as clientBase

WORKDIR /usr/src/app
COPY package.json .

#DEPENDENCIES -----------------------------------
FROM clientBase as clientDependencies

# copy production node_modules aside
RUN npm install --only=production 
RUN cp -R node_modules prod_node_modules

RUN npm install

#BUILD -----------------------------------
FROM clientDependencies as clientBuild

COPY . .

RUN npm run build

RUN mkdir build_result

RUN cp -R index.js build_result/ && \
        cp -R package.json build_result/ && \
        cp -R public build_result/

#RELEASE -----------------------------------
FROM clientBase AS clientRelease

RUN npm install webpack-dev-server nodemon -g

COPY --from=clientDependencies /usr/src/app/prod_node_modules ./node_modules
COPY --from=clientBuild /usr/src/app/build_result .

ENV PORT=4000
EXPOSE 4000
EXPOSE 8080

CMD ["npm", "run", "start:docker"]
