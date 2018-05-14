const webpack = require('webpack')
const { resolve } = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { InjectManifest } = require('workbox-webpack-plugin')

module.exports = function(environment) {
  if (!environment) environment = process.env.NODE_ENV || 'development'

  const plugins = [new webpack.EnvironmentPlugin({ NODE_ENV: environment })]

  // Customize output
  if (environment === 'production') {
    plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'disabled', generateStatsFile: true, statsFilename: '../client-bundle-stats.json' }))
  } else {
    plugins.push(new BundleAnalyzerPlugin({ openAnalyzer: false }))
  }
  plugins.push(new InjectManifest(require('./workbox.config')))

  return {
    entry: [require.resolve('regenerator-runtime/runtime.js'), './src/client/application.jsx'],
    output: {
      path: resolve(__dirname, 'dist'),
      filename: 'app.js'
    },
    mode: environment === 'production' ? 'production' : 'development',
    plugins,
    resolve: {
      extensions: ['.js', '.jsx', '.json']
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules|(src\/server)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { modules: false, targets: { browsers: ['last 2 versions', 'IE >= 11'] } }], '@babel/preset-react'],
              plugins: ['@babel/plugin-proposal-object-rest-spread']
            }
          }
        }
      ]
    }
  }
}
