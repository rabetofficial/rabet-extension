/* eslint-disable */

const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const common = require('./common.js');

module.exports = Object.assign({}, common, {
  mode: 'production',
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
  ],
});
