const { Duplex } = require('readable-stream')

const dStream = new Duplex({
  read: function (size) {
    this.push(':-)')
    if (allDone) { this.push(null) }
  },
  write: function (data, enc, cb) {
    //do something with data
    cb()
  }
})

