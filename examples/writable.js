const { Writable } = require('stream')
class MyStream extends Writable {
  _write(data, encode, cb) {
    //do something with data
    cb()
  }
}
const stream = new MyStream()
