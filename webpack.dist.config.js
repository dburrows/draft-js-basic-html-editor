const webpack = require("webpack");
const path = require('path');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
  devtool: false,
  entry: {
    example: [
      "./src/BasicHtmlEditor.js"
    ]
  },
  output: {
    path:       path.resolve(__dirname, 'dist'),
    filename: "index.js",
    libraryTarget: 'umd'
  },
  plugins: [
    new LodashModuleReplacementPlugin({
      'shorthands': true,
      'collections': true
    })
  ],
  externals: {
    'react-dom': 'react-dom',
    'react': 'react'
  },
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
              ['env', {modules: false, useBuiltIns: true}],
              'stage-0'
            ]
          }
        }
      }
    ]
  }
};
