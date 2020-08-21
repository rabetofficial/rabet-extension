/* eslint-disable */

const webpack = require('webpack');
const { resolve } = require('path');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: resolve(__dirname, '..', 'src/app.js'),
  output: {
    filename: 'bundle.js',
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
          presets: [
            "@babel/preset-env",
          ],
          plugins: [],
        }
      },
    ],
  },
  resolve: {
    alias: {
      Root: resolve(__dirname, '..' ,'src'),
    },
    extensions: ['.js', '.jsx'],
  },
  target: 'web',
};
