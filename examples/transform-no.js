const fs = require('fs')
const { Transform } = require('stream')

const upper = new Transform({
  transform: function (data, enc, cb) {
    this.push(data.toString().toUpperCase())
    cb()
  }
})

fs.createReadStream(__filename)
  .pipe(upper)
  .pipe(process.stdout)
