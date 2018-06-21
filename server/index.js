const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoose = require("mongoose");

const schema = require("./src/graphql");

const app = express();
app.use("/", graphqlHTTP({
  schema: schema,
  graphiql: true
}));  

// Connect mongo database
const mongoPort = process.env.MONGOPRORT || 27017;
mongoose.connect(`mongodb://external:readOnly@mongo_net:${mongoPort}/moderncvapp`);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Running a GraphQL API server at mongo_net:${port}/`);
});