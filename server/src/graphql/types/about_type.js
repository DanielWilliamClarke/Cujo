const { GraphQLObjectType } = require("graphql");
const { GraphQLNonNull } = require("graphql");
const { GraphQLString } = require("graphql");
const { GraphQLID } = require("graphql");

module.exports = new GraphQLObjectType({
  name: "About",
  description: "markdown for about section",
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    content: {
      type: GraphQLString
    }
  }
});