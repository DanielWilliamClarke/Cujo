const { GraphQLObjectType } = require("graphql");
const { GraphQLString } = require("graphql");

module.exports = new GraphQLObjectType({
  name: "About",
  description: "markdown for about section",
  fields: {
    about: {
      type: GraphQLString
    }
  }
});