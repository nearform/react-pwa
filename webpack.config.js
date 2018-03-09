const path = require('path')

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
  output: {
    filename: 'public/js/[name].js',
    chunkFilename: 'public/js/[name].chunk.js',
    publicPath: '/',
    path: PATHS.BUILD
  }
}
