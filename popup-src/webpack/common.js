/* eslint-disable */

const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const { resolve } = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: resolve(__dirname, '..', 'src/app.jsx'),
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, '..', '..', 'popup'),
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
            "@babel/preset-react"
          ],
          plugins: [],
        }
      },
      {
        test: /\.(css|less)$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: 'global',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins() {
                return [autoprefixer];
              }
            }
          }, {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 500000,
              // outputPath: 'assets'
            },
          },
        ]
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
