'use strict'

const fs = require('fs')
const util = require('util')
const stream = require('stream')
const { pipeline, finished } = require('stream/promises')
const path = require('path')
const { createBrotliDecompress } = require('zlib')
const saxophonist = require('saxophonist')

const files = process.argv.splice(2)
const pagesFilename = path.resolve(__dirname, 'pages.csv')


// TODO
// promisify stream.finished
let total = 0

const chunkToRow = (chunk) => {
  const title = chunk.children[0].text
  const id = chunk.children[2].text
  return `${id},${title}\n`
}

async function parseAsync(file, writable) {
  console.time(file)
  const readable = fs.createReadStream(file)
  const brotli = createBrotliDecompress()
  const parseStream = saxophonist('page', {
    highWaterMark: 1024 * 1024 * 1024 * 32
  })

  await pipeline(
    readable,
    brotli,
    parseStream,
    async function * (stream) {
      for await (const chunk of stream) {
        total++
        yield chunkToRow(chunk)
      }
    },
    writable,
    { end: false }
  )

  // TODO
  // 1. Pipe together the readable and parseStream, adding a catch handler
  // 2. Iterate over the parseStream using for await (const chunk of parseStream) {}
  // 3. Increment the total in the loop
  // 4. Write the chunk to the writable
  // 5. Handle backpressure - read the README.md for more details on that ;)

  console.timeEnd(file)
}

async function start () {
  console.log('starting')
  console.time('parsing time')
  console.log('Reading files: ', files)

  const writable = fs.createWriteStream(pagesFilename)
  writable.write('id,title\n')


  for (const file of files) {
    await parseAsync(file, writable)
  }
  
  // TODO
  // 1. Create the write stream for pagesFilename
  // 2. Iterate over each file and call parseAsync in *series*
  // 3. End the writable stream and then wait on `finished(writeable)`

  // TODO: Extra - parallelise
  // 1. Map over each file and call parseAsync
  // 2. Promise.all that array of promises
  // 3. Use `p-limit` to limit the concurrency

  console.log('total: ', total)
  console.timeEnd('parsing time')
  writable.end()
  await finished(writable)
}

start()
