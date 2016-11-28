var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  devtool: 'source-map',
  entry: {
    'angular2': [
      'rxjs',
      'reflect-metadata',
      '@angular/core'    
    ],
    'app': './app/main'
  },

  output: {
    path: __dirname + '/build/',
    publicPath: 'build/',
    filename: '[name].js',
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    extensions: ['.ts','.js','.json', '.css', '.html']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader?tsconfig=./tsconfig.json', 'angular2-template-loader'],
        exclude: [ /node_modules/ ]
      },
      {
        test: /\.(html|css)$/,
        loader: 'raw-loader',
        exclude: [ /node_modules/ ]
      },
      {
        test: /\.json$/, 
        loader: 'json'
      }
    ]
  },
  externals: [nodeModules],
  plugins: [
    new CommonsChunkPlugin({ name: 'angular2', filename: 'angular2.js', minChunks: Infinity }),
    new CommonsChunkPlugin({ name: 'common',   filename: 'common.js' }),
    new webpack.ExternalsPlugin('commonjs', ['electron']),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      __dirname
    )
    
  ],
  target: 'node-webkit'
};
