module.exports = {
  presets: [['@babel/preset-env', { targets: { node: true }, modules: false }], '@babel/preset-react'],
  plugins: ['@babel/plugin-proposal-object-rest-spread']
}
