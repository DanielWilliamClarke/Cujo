const dotenv = require("dotenv");
const path = require("path");
if (process.env.NODE_ENV !== 'prod' || process.env.NODE_ENV !== 'docker') {
  dotenv.config({ path: path.resolve(__dirname, 'server.env') });
}

const express = require('express');
const graphqlHTTP = require('express-graphql');
const MongoSetup = require("./src/connection/mongo_setup");

const schema = require("./src/graphql");

const app = express();
app.use("/cv", graphqlHTTP({
  schema: schema,
  graphiql: true
}));

const mongoSetup = new MongoSetup({
  host: process.env.MONGOHOST,
  user: process.env.MONGOUSER,
  pass: process.env.MONGOPASS,
  collection: process.env.MONGOCOLLECTION
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Running a GraphQL API server at localhost:${port}/`);
  mongoSetup.connect();
});