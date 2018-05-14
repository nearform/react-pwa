const config = require('./babel.config')

config.presets[0][1].modules = 'commonjs'
require('@babel/register')(config)
