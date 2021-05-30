/* eslint-disable */

const webpack = require('webpack');
const { resolve } = require('path');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    client_script: resolve(__dirname, '..', 'src/client_script/index.js'),
    content_script: resolve(__dirname, '..', 'src/content_script/index.js'),
    background: resolve(__dirname, '..', 'src/background_script/index.js'),
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, '..', '..', 'background'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          presets: ['@babel/preset-env'],
          plugins: [],
        },
      },
    ],
  },
  resolve: {
    alias: {
      Root: resolve(__dirname, '..', 'src'),
    },
    extensions: ['.js', '.jsx'],
  },
  target: 'web',
};
