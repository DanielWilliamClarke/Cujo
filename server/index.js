const express = require('express');
const graphqlHTTP = require('express-graphql');

const MongoSetup = require("./src/connection/mongo_setup");

const schema = require("./src/graphql");

const app = express();
app.use("/", graphqlHTTP({
  schema: schema,
  graphiql: true
}));

const mongoPort = process.env.MONGOPORT || 27017;
const mongoHost = process.env.MONGOHOST || "localhost";
const mongoUrl = `mongodb://external:readOnly@${mongoHost}:${mongoPort}/moderncvapp`;
const mongoSetup = new MongoSetup(mongoUrl);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Running a GraphQL API server at localhost:${port}/`);
  mongoSetup.connect();
});