var webpack = require('webpack');
var path = require('path');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: {
    example: [
      'webpack-dev-server/client?http://localhost:3002',
      'webpack/hot/only-dev-server',
      path.resolve(__dirname, 'example/index.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, 'lib'), // string
    filename: 'bundle.js',
    publicPath: 'http://localhost:3002/lib/'
  },
  plugins: [
    new LodashModuleReplacementPlugin({
      'shorthands': true,
      // 'collections': true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // This is a feature of `babel-loader` for Webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel']
        }
      }

    ]
  },
  devServer: {
    port: 3002,
    inline: true,
    hot: true,
    publicPath: '/',
    contentBase: './',
    headers: { 'Access-Control-Allow-Origin': '*' }
  }
};
