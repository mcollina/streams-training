const { Readable } = require('node:stream')

function run (name) {
  return new Promise((resolve) => {
    const r = new Readable({
      read () {
      }
    })
    r.destroy(new Error('kaboom'))
    resolve(r)
  }).then(((e) => {
    e.on('error', err => {
      console.error(`### ${name} ###`, err)
    })
  }))
}

queueMicrotask(run.bind(null, 'queueMicrotask'))
setImmediate(run.bind(null, 'setImmediate'))
