'use strict';

const { merge } = require('webpack-merge');

const common = require('./webpack/webpack.common');
const developmentConfig = require('./webpack/webpack.dev');
const productionConfig = require('./webpack/webpack.prod');

module.exports = (_env, argv) => {
  const isDevelopment = argv.mode === 'development';
  const config = isDevelopment ? developmentConfig : productionConfig;
  return merge(common, config);
};
