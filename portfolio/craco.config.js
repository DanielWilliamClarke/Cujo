// craco.config.js
const CracoEsbuildPlugin = require('craco-esbuild');
const CracoGraphqlLoader = require("craco-graphql-loader");

module.exports = {
  plugins: [
    { plugin: CracoEsbuildPlugin },
    { plugin: CracoGraphqlLoader }
  ],
};