const { GraphQLObjectType, GraphQLSchema } = require("graphql");
const { GetAbout } = require("./queries/about_query");

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    GetAbout: GetAbout
  })
});

module.exports = new GraphQLSchema({
  query: RootQuery
});