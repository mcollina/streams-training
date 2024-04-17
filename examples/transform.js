const fs = require('fs')
const { Transform, pipeline } = require('stream')

const upper = new Transform({
  transform: function (data, enc, cb) {
    this.push(data.toString().toUpperCase())
    cb()
  }
})

pipeline(
  fs.createReadStream(__filename),
  upper,
  process.stdout,
  err => {
    if (err) {
      console.error('Pipeline failed.', err)
    } else {
      console.log('Pipeline succeeded.')
    }
  }
)
