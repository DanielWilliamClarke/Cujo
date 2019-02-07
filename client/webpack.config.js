const HtmlWebPackPlugin = require("html-webpack-plugin");
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './public');
var APP_DIR = path.resolve(__dirname, './src');

module.exports = {
  devtool: 'source-map',
  entry: {
    main: APP_DIR + '/index.js'
  },
  output: {
    filename: 'main.js',
    path: BUILD_DIR,
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules|test/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ],
  watchOptions: {
    poll: 1000
  }
}