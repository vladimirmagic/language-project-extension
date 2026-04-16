const path = require('path');

const rootPath = process.cwd();
const pluginOutputPath = path.resolve(rootPath, 'build/plugin');
const backgroundPath = path.resolve(rootPath, 'src/extension/background');
const youtubeButtonInjectPath = path.resolve(rootPath, 'src/extension/youtube-button');
const publicPath = '/build/';

const mode = process.env.NODE_ENV;
const fastMode = process.env.FAST_MODE;
const production = 'production';
const development = 'development';
const isProd = mode === production;
const isDev = mode === development;
const isTestMode = 1;

module.exports = {
  rootPath,
  backgroundPath,
  mode,
  fastMode,
  production,
  development,
  isProd,
  isDev,
  isTestMode,
  publicPath,
  youtubeButtonInjectPath,
  pluginOutputPath
};
