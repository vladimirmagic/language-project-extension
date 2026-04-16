const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');

const { mode, rootPath, production } = require('../constants');
const { transformManifest } = require('./mainfest_transformer');

const plugins = [
  new MiniCssExtractPlugin({
    filename: '[name].css',
  }),

  mode === production && new CleanWebpackPlugin(),
  mode === production && new CopyWebpackPlugin({
    patterns: [
      {
        from: `${rootPath}/src/extension/manifest.json`,
        to: 'manifest.json',
        transform(content) {
          return parseInt(process.env.LANG_PROJECT_BUILD_RELEASE) ? transformManifest(content) : content.toString();
        },
      },
      {
        from: `${rootPath}/img/`,
        to: 'images/'
      },
      {
        from: `${rootPath}/icons/logo.png`,
        to: 'logo.png'
      },
    ],
  }),
  mode === production && new webpack.ProvidePlugin({
    process: 'process/browser',
 }),
];

module.exports = plugins;
