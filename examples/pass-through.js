const { PassThrough } = require('stream')

const tunnel = new PassThrough();

tunnel.on('data', (chunk) => {
  console.log('bytes:', chunk); // bytes: <Buffer 23 .. >
});

process.stdin
  .pipe(tunnel)
  .pipe(process.stdout);
