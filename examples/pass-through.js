const { PassThrough, pipeline } = require('stream')

const tunnel = new PassThrough();

tunnel.on('data', (chunk) => {
  console.log('bytes:', chunk); // bytes: <Buffer 23 .. >
});

pipeline(process.stdin, tunnel, process.stdout, (err) => { })
