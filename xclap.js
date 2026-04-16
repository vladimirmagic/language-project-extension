const xclap = require('xclap');

const { development, production } = require('./webpack/constants');

const tasks = {
  '.dev': () => {
    process.env.NODE_ENV = development;
  },

  '.dev-fast': () => {
    process.env.NODE_ENV = development;
    process.env.FAST_MODE = true;
  },

  '.prod': () => {
    process.env.NODE_ENV = production;
  },

  '.test': () => {
    process.env.NODE_ENV = production;
  },

  'webpack-backend': 'webpack --config ./webpack/backend/webpack.config.js',
  'webpack-plugin': 'webpack --config ./webpack/plugin/webpack.config.js',

  'webpack-dev-server': 'webpack-dev-server --config ./webpack/devserver/webpack.config.js',

  buildBackendDev: {
    desc: 'Development build for SPA',
    task: ['.dev', 'webpack-backend'],
  },
  buildBackendDevFast: {
    desc: 'Development build for SPA',
    task: ['.dev-fast', 'webpack-backend'],
  },
  buildBackendProd: {
    desc: 'Production build for SPA',
    task: ['.prod', 'webpack-backend'],
  },
  buildBackendTest: {
    desc: 'Test build for SPA',
    task: ['.test', 'webpack-backend'],
  },

  buildPluginDev: {
    desc: 'Development build for chrome extension',
    task: ['.dev', 'webpack-plugin'],
  },
  buildPluginProd: {
    desc: 'Production build for chrome extension',
    task: ['.prod', 'webpack-plugin'],
  },
  buildPluginTest: {
    desc: 'Test build for chrome extension',
    task: ['.test', 'webpack-plugin'],
  },

  startDevServer: {
    desc: 'Run dev server',
    task: ['.dev', 'webpack-dev-server'],
  },
};

xclap.load(tasks);
