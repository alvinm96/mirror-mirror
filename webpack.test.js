var helpers = require('./helpers');
var webpack = require('webpack');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;

var config = {
  devtool: 'inline-source-map',

  resolve: {
    extensions: ['', '.ts', '.js'],
    root: helpers.root('app'),
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
        exclude: [ /node_modules/ ]
      },   
      {
        test: /\.(html|css)$/,
        loader: 'raw-loader',
        exclude: [ /node_modules/ ]
      }
    ]
  },

  node: {
      child_process: 'empty',
      global: 'window',
      process: false,
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false
  },

  externals: {
    'electron': 'require("electron")',
    'net': 'require("net")',
    'remote': 'require("remote")',
    'shell': 'require("shell")',
    'app': 'require("app")',
    'ipc': 'require("ipc")',
    'fs': 'require("fs")',
    'buffer': 'require("buffer")',
    'request': 'require("request")',
    'system': '{}',
    'file': '{}'
  }
}

module.exports = config;