'use strict';

const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(css|scss)$/i,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },
  plugins: [new CaseSensitivePathsPlugin()],
  optimization: {
    providedExports: false,
  },
};
