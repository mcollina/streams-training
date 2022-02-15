const { Readable } = require('stream')
class MyStream extends Readable {
  _read(size) {
    this.push(':-)')
    if (allDone) { this.push(null) }
  }
}
const stream = new MyStream()
