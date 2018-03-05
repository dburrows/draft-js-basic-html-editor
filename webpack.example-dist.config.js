var webpack = require("webpack");
var path = require('path');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    example: [
      "./example/index.js"
    ]
  },
  output: {
    path: path.resolve(__dirname, 'example-dist'),
    filename: "bundle.js"
  },
  plugins: [
    new LodashModuleReplacementPlugin({
      'shorthands': true,
      // 'collections': true
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader"]
      },
      {
        test: /\.js$/,
        exclude: [ /node_modules/],
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              'lodash'
            ],
            presets: [
              'react',
              ['env', {modules: false}],
              'stage-0'
            ]
          }
        }
      }
    ]
  }
};
