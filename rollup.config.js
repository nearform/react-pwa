import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/server/index.js',
  output: {
    file: 'index.js',
    format: 'cjs',
    globals: {
      process: 'process'
    }
  },
  external: [...Object.keys(require('./package').dependencies), 'react-dom/server', 'fs', 'path'],
  plugins: [
    resolve({
      extensions: ['.js', '.jsx']
    }),
    babel(require('./babel.config'))
  ]
}
