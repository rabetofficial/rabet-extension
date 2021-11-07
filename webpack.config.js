const { resolve } = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const devMode = process.env.NODE_ENV !== 'production';

const plugins = [];

if (!devMode) {
  plugins.push(new MiniCssExtractPlugin());
}

module.exports = {
  entry: {
    popup: resolve(`${__dirname}/src/popup/index.jsx`),
    background_script: resolve(`${__dirname}/src/background_script/index.js`),
    client_script: resolve(`${__dirname}/src/client_script/index.js`),
    interaction: resolve(`${__dirname}/src/interaction/index.jsx`),
  },
  output: {
    filename: '[name].js',
    path: resolve(`${__dirname}/dist`),
  },
  optimization: {
    minimizer: [
      new HtmlMinimizerPlugin(),
      new TerserPlugin(),
      new CssMinimizerPlugin(),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.less$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          // devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 500000,
            },
          },
        ],
      },
    ],
  },
  plugins,
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      stream: require.resolve('stream-browserify'),
    },
    extensions: ['.js', '.jsx'],
  },
};
