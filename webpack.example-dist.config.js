var webpack = require("webpack");
var path = require('path');

module.exports = {
  devtool: 'eval',
  resolve: {
    fallback: path.join(__dirname, "node_modules"),
    alias: {
      "react": __dirname + '/node_modules/react',
      "react-dom": __dirname + '/node_modules/react-dom'
    }
  },
  entry: {
    example: [
      "./example/index.js"
    ]
  },
  output: {
    path: './example-dist',
    filename: "bundle.js"
  },
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
