const { Readable } = require('stream')
const util = require('util')

const sleep = util.promisify(setTimeout)

let messagesSent = 0

class MyStream extends Readable {
  _read(size) {
    this.push(':-)')
    messagesSent++
    if (messagesSent === 3) {
      // end
      this.push(null)
    }
  }
}

const stream = new MyStream()

stream.on('data', async (chunk) => {
  console.log('received', chunk)
  await sleep(5000)
  console.log('done')
})
