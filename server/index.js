const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

var app = express();

const port = process.env.PORT || 3001;

app.use("/", graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
})); 

app.listen(port, () => {
  console.log(`Running a GraphQL API server at localhost:${port}/`);
});