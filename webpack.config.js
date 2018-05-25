const { EnvironmentPlugin } = require('webpack')
const { resolve } = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { InjectManifest } = require('workbox-webpack-plugin')
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin')

module.exports = function(environment) {
  if (!environment) environment = process.env.NODE_ENV || 'development'

  const version = new Date() // Format: YYYYMMDD.HHmmss
    .toISOString()
    .split('.')
    .shift()
    .replace(/[-:]/g, '')
    .replace('T', '.')
  const plugins = [
    new EnvironmentPlugin({ NODE_ENV: environment }),
    new ReplaceInFileWebpackPlugin([
      {
        dir: 'dist/client',
        files: ['sw.js'],
        rules: [
          {
            search: 'VERSION',
            replace: version
          },
          {
            search: /SW_DEBUG/,
            replace: environment === 'production' ? 'false' : 'true'
          }
        ]
      }
    ])
  ]

  // Customize output
  if (environment === 'production' || process.env.BUILDING) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled',
        generateStatsFile: true,
        statsFilename: '../../coverage/client-bundle-stats.json'
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
    entry: './src/client/application.jsx',
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
              presets: ['@babel/preset-react'],
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
