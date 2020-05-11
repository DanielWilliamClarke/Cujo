const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { GetCV } = require("./queries/cv_query");

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    GetCV: GetCV
  })
});

module.exports = new GraphQLSchema({
  query: RootQuery
});