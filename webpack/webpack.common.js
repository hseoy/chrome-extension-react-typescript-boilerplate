'use strict';

const env = require('./utils/env.js');

const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const rootDir = path.join(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const publicDir = path.join(rootDir, 'public');

const fileExtensions = ['eot', 'otf', 'ttf', 'woff', 'woff2'];
const imageFileExtensions = ['bmp', 'jpg', 'jpeg', 'png', 'gif', 'svg'];

const imageInlineSizeLimit = process.env.IMAGE_INLINE_SIZE_LIMIT
  ? parseInt(process.env.IMAGE_INLINE_SIZE_LIMIT)
  : 1024 * 10;

module.exports = {
  entry: {
    popup: path.join(srcDir, 'extensions', 'Popup', 'index.tsx'),
    newtab: path.join(srcDir, 'extensions', 'NewTab', 'index.tsx'),
    background: path.join(srcDir, 'extensions', 'Background', 'index.ts'),
    contentScript: path.join(srcDir, 'extensions', 'ContentScript', 'index.ts'),
  },
  output: {
    path: path.join(rootDir, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          'babel-loader',
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
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public/manifest.json',
          to: path.join(rootDir, 'dist'),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public/icon16.png',
          to: path.join(rootDir, 'dist'),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public/icon48.png',
          to: path.join(rootDir, 'dist'),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public/icon128.png',
          to: path.join(rootDir, 'dist'),
          force: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.join(publicDir, 'newtab.html'),
      filename: 'newtab.html',
      chunks: ['newtab'],
      cache: false,
    }),
    new HtmlWebpackPlugin({
      template: path.join(publicDir, 'popup.html'),
      filename: 'popup.html',
      chunks: ['popup'],
      cache: false,
    }),
  ],
};
