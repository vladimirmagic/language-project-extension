const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const {
  pluginOutputPath,
  mode,
  backgroundPath,
  production,
  publicPath,
  youtubeButtonInjectPath
} = require('../constants');

console.log(mode);

module.exports = {
  mode,
  devtool: mode === production ? 'source-map' : 'inline-source-map',
  entry: {
   // 'browser-action': path.resolve(popupPath, 'index.ts'),
    'service_worker': path.resolve(backgroundPath, 'service_worker.ts'),
    'youtube-button-inject': path.resolve(youtubeButtonInjectPath, 'index.ts'),
  },
  output: {
    path: pluginOutputPath,
    publicPath: publicPath,
    filename: '[name].js',
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({ parallel: true }),
      new CssMinimizerPlugin({ parallel: true }),
    ],
  },
  target: 'web',
  module: require('../module'),
  plugins: require('./plugins'),
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.scss', '.d.ts'],
  }/*,
  watch: true,
  watchOptions: {
    ignored: ['**!/node_modules'],
  },*/
};
