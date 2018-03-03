var webpack = require("webpack");
var path = require('path');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  devtool: 'source-map',
  resolve: {
    modules: [path.join(__dirname, 'node_modules')],
    alias: {
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom')
    }
  },
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
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new LodashModuleReplacementPlugin({
      'shorthands': true,
      'collections': true
    }),
    new BundleAnalyzerPlugin()

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
              ['env', {modules: false, useBuiltIns: true}],
              'stage-0'
            ]
          }
        }
      }
    ]
  }
};
