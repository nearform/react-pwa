const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const PATHS = {
  BUILD: path.resolve(__dirname, 'build'),
  SRC: path.resolve(__dirname, 'src')
}

const devConfig = {
  devtool: '#cheap-module-source-map' // inline-source-map?
}

const productionConfig = {
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    })
  ]
}

const commonConfig = {
  mode: process.env.NODE_ENV === 'production'
    ? 'production'
    : 'development',
  entry: {
    'app-shell': path.join(PATHS.SRC, 'client/js/app-shell.js')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {modules: false, useBuiltIns: 'entry'}],
              '@babel/preset-react'
            ],
            'plugins': [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-proposal-object-rest-spread'
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        NOW: JSON.stringify(process.env.NOW),
        NOW_URL: JSON.stringify(process.env.NOW_URL)
      }
    })
  ],
  output: {
    filename: 'public/js/[name].js',
    chunkFilename: 'public/js/[name].chunk.js',
    publicPath: '/',
    path: PATHS.BUILD
  }
}

module.exports = () => {
  return process.env.NODE_ENV === 'production'
    ? merge(commonConfig, productionConfig)
    : merge(commonConfig, devConfig)
}
