const http = require('http');
const fs = require('fs')
const { Transform } = require('stream');

let callCount = 0
const transform = new Transform({
  transform: (chunk, enc, cb) => {
    ++callCount

    if (callCount) {
      throw new Error('unexpected behavior')
    }

    cb(null, chunk)
  }
})

http.createServer(function(request, response) {
  try {
    fs.createReadStream(__filename)
      .pipe(transform)
      .pipe(response)
  } catch (e) {
    console.log(e)
  }
}).listen(8080);
