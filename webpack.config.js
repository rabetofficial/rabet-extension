const webpack = require('webpack');
const process = require('process');
const { resolve } = require('path');
const autoprefixer = require('autoprefixer');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const devMode = process.env.NODE_ENV !== 'production';

const plugins = [
  new webpack.ProvidePlugin({
    Buffer: ['buffer', 'Buffer'],
  }),
];

if (!devMode) {
  plugins.push(new MiniCssExtractPlugin());
}

const config = {
  entry: {
    popup: resolve(`${__dirname}/src/popup/index.jsx`),
    background_script: resolve(
      `${__dirname}/src/background_script/index.js`,
    ),
    content_script: resolve(
      `${__dirname}/src/content_script/index.js`,
    ),
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
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: false,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
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
              postcssOptions: {
                plugins() {
                  return [autoprefixer];
                },
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg)$/,
        type: 'asset/resource',
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
      buffer: require.resolve('buffer'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      src: resolve(__dirname, 'src'),
      popup: resolve(__dirname, 'src', 'popup'),
      helpers: resolve(__dirname, 'src', 'helpers'),
      assets: resolve(__dirname, 'src', 'assets'),
    },
  },
  watch: devMode,
  target: 'web',
};

if (devMode) {
  config.devtool = 'source-map';
}

module.exports = config;
