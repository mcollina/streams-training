const { pipeline } = require('stream')
const fs = require('fs')

async function * transform(source) {
  for await (let chunk of source) {
    yield chunk.toString().toUpperCase()
  }
}

pipeline(
  fs.createReadStream(__filename),
  transform, // PULL BASED
  process.stdout,
  (err) => { if (err) console.error(err) }
)
