// craco.config.js
const CracoEsbuildPlugin = require('craco-esbuild');
const CracoGraphqlLoader = require("craco-graphql-loader");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin
  
const analyzerMode = process.env.REACT_APP_INTERACTIVE_ANALYZE
  ? "server"
  : "json"

module.exports = {
  plugins: [
    { plugin: CracoEsbuildPlugin },
    { plugin: CracoGraphqlLoader }
  ],
  webpack: {
    plugins: [new BundleAnalyzerPlugin({ analyzerMode })]
  }
};