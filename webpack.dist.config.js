const webpack = require("webpack");
const path = require('path');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
  devtool: 'none',
  entry: {
    example: [
      "./src/BasicHtmlEditor.js"
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "index.js",
    libraryTarget: "umd", // universal module definition
    umdNamedDefine: true, // boolean
    // use a named AMD module in UMD library
  },
  plugins: [
    new LodashModuleReplacementPlugin({
      'shorthands': true,
      // 'collections': true
    })
  ],
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    }
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
              ['env', {modules: false}],
              'stage-0'
            ]
          }
        }
      }
    ]
  }
};
