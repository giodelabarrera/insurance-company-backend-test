'use_strict';

const commonPaths = require('./common-paths');
const { ProgressPlugin } = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: `${commonPaths.src}/index.ts`,
  output: {
    path: commonPaths.build,
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/, loader: 'awesome-typescript-loader'
      },
      {
        test: /\.js$/, loader: "source-map-loader"
      }
    ]
  },
  target: 'node',
  externals: nodeExternals(),
  plugins: [
    new ProgressPlugin()
  ]
};