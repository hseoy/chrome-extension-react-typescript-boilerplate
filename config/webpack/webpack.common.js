'use strict';

const env = require('./env.js');
const paths = require('./paths.js');

const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const fileExtensions = ['eot', 'otf', 'ttf', 'woff', 'woff2'];
const imageFileExtensions = ['bmp', 'jpg', 'jpeg', 'png', 'gif', 'svg'];

const imageInlineSizeLimit = process.env.IMAGE_INLINE_SIZE_LIMIT
  ? parseInt(process.env.IMAGE_INLINE_SIZE_LIMIT)
  : 1024 * 10;

module.exports = {
  entry: {
    popup: paths.appPopup,
    newtab: paths.appNewTab,
    background: paths.appBackground,
    contentScript: paths.appContentScript,
  },
  output: {
    path: paths.appBuild,
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: true,
              configFile: paths.babelConfig,
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/,
      },
      {
        test: new RegExp('.(' + fileExtensions.join('|') + ')$'),
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
        exclude: /node_modules/,
      },
      {
        test: new RegExp('.(' + imageFileExtensions.join('|') + ')$'),
        loader: 'url-loader',
        options: {
          limit: imageInlineSizeLimit,
          name: '[name].[ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin({ typescript: true }),
    new webpack.DefinePlugin(env.stringified),
    new HtmlWebpackPlugin({
      template: paths.appNewTabHtml,
      filename: 'newtab.html',
      chunks: ['newtab'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: paths.appPopupHtml,
      filename: 'popup.html',
      chunks: ['popup'],
      cache: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public/manifest.json',
          to: '.',
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.appPublic,
          to: '.',
          globOptions: {
            ignore: [
              '*/**/manifest.json',
              '*/**/newtab.html',
              '*/**/popup.html',
            ],
          },
        },
      ],
    }),
  ],
};
