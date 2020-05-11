const { GraphQLObjectType } = require("graphql");
const { GraphQLString } = require("graphql");

module.exports = new GraphQLObjectType({
  name: "CV",
  description: "contains all aspects of the cv",
  fields: {
    statement: {
      type: GraphQLString
    }
  }
});