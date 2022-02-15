'use strict'

const fs = require('fs')
const stream = require('stream')
const path = require('path')
const saxophonist = require('saxophonist')

const files = process.argv.splice(2)
const pagesFilename = path.resolve(__dirname, 'pages.csv')
let total = 0

// TODO promisify stream.pipeline

const chunkToRow = (chunk) => {
  const title = chunk.children[0].text
  const id = chunk.children[2].text
  return `${id},${title}\n`
}

async function parsePipeline(file) {
  // TODO
  // 1. Create a readable stream for the file
  // 2. Create a writable stream for the pages.csv (pagesFilename) - this should have the append flag set
  // 3. Create the saxophonist parse stream
  // 4. Create a PassThrough stream for incrementing the `total` - set objectMode: true
  // 5. Create a Transform stream and use `chunkToRow`
  // 6. Finally, pipe them all together using pipeline, returning the promise
}

async function start () {
  console.log('starting')
  console.time('parsing time')

  // Creates the file, and adds the csv headers
  fs.writeFileSync(pagesFilename, 'id,title\n')

  try {
    for (const file of files) {
      console.log('reading ', file)
      await parsePipeline(file)
      console.log('parsed ', file)
    }
  } catch (error) {
    console.log(error)
  }

  console.log('total: ', total)
  console.timeEnd('parsing time')
}

start()
