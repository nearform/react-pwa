const path = require('path')
const webpack = require('webpack')

const PATHS = {
  BUILD: path.resolve(__dirname, 'build'),
  SRC: path.resolve(__dirname, 'src')
}

module.exports = {
  devtool: '#cheap-module-source-map',
  entry: {
    'app-shell': path.join(PATHS.SRC, 'client/js/app-shell.js')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
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
