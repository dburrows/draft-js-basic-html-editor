var webpack = require("webpack");
var path = require('path');

module.exports = {
  devtool: false,
  entry: {
    example: [
      "./src/BasicHtmlEditor.js"
    ]
  },
  output: {
    path: './dist',
    filename: "index.js",
    libraryTarget: 'commonjs'
  },
  externals: ['react', 'react-dom'],
  module: {
    loaders: [
      {
        test: /\.css$/, loader: "style-loader!css-loader"
      },
      {
        test: /\.scss$/,
        loader: "style!css!postcss!sass"
      },
      {
        test: /\.js$/,
        exclude: [ /node_modules/],
        loaders: ["babel-loader"]
      }
    ]
  }
};
