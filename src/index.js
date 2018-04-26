require('@babel/polyfill')

const server = require('./server')

;(async () => {
  try {
    const {port} = await server.init()
    console.log(`\n\n Server started on port ${port}`)
  } catch (err) {
    console.error('Server init issue:', err)
    throw err
  }
})()
