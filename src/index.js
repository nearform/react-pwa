import '@babel/polyfill'
import fetch from 'cross-fetch'
import init from './server'

global.fetch = fetch;

(async () => {
  try {
    const {port} = await init()
    console.log(`\n\n Server started on port ${port}`)
  } catch (err) {
    console.error('Server init issue:', err)
    throw err
  }
})()
