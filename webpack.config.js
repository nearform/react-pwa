const webpack = require('webpack')
const { resolve } = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { InjectManifest } = require('workbox-webpack-plugin')

module.exports = function(environment) {
  if (!environment) environment = process.env.NODE_ENV || 'development'

  const plugins = [new webpack.EnvironmentPlugin({ NODE_ENV: environment })]

  // Customize output
  if (environment === 'production' || process.env.BUILDING) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        generateStatsFile: true,
        statsFilename: '../../client-bundle-stats.json'
      })
    )
  } else {
    plugins.push(
      new BundleAnalyzerPlugin({
        openAnalyzer: false
      })
    )
  }
  plugins.push(
    new InjectManifest({
      swSrc: 'src/client/sw.js',
      swDest: 'sw.js',
      exclude: [/\.map$/]
    })
  )

  return {
    entry: [require.resolve('regenerator-runtime/runtime.js'), './src/client/application.jsx'],
    output: {
      path: resolve(__dirname, 'dist/client'),
      filename: 'app.js'
    },
    mode: environment === 'production' ? 'production' : 'development',
    plugins,
    resolve: {
      extensions: ['.js', '.jsx']
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
        },
        {
          test: /(manifest\.json)$/,
          type: 'javascript/auto',
          use: {
            loader: 'file-loader',
            options: { name: '[path][name].[ext]', outputPath: path => path.replace('src/client/', '') }
          }
        },
        {
          test: /\.(ico|png)$/,
          use: {
            loader: 'file-loader',
            options: { name: '[path][name].[ext]', outputPath: path => path.replace('src/client/', '') }
          }
        }
      ]
    }
  }
}
