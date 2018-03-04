const server = require('./server');

server.init()
  .then(({ app }) => {
    console.log('\n\n server started on port 3000');
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  })
