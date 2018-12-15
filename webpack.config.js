/**
 * Webpack Config
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

const mode = process.env.NODE_ENV || 'development';

const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

const config = {
  mode,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: process.env.PATH_PRODUCTION
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] }
      },
      {
        test: /\.s?css$/,
        use: [
          mode !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].css'
    }),
    new webpack.DefinePlugin(envKeys),
    new webpack.HotModuleReplacementPlugin()
  ]
};

if (mode == 'development') {
  Object.assign(config, {
    devtool: 'inline-source-map',
    output: {
      publicPath: process.env.PATH_DEVELOPMENT
    },
    devServer: {
      contentBase: './dist',
      hot: true,
      historyApiFallback: true,
      proxy: {
        '/postman': 'http://localhost:5555',
        '/v1': 'http://localhost:28080'
      }
    }
  });
}

module.exports = config;
