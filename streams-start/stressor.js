'use strict'

const fs = require('fs')

// use this to parse the XML file
const saxophonist = require('saxophonist')

// use this to pipe streams
const { pipeline } = require('stream')

// count the total number of pages
let total = 0

// pass any numbers of files as arguments when you launch this
// Usage: node stressor file1 file2
// Example: node stressor wikipedia/enwiki-20151201-pages-meta-current1.xml-p000000010p000010000
// Example: node stressor wikipedia/*
const files = process.argv.splice(2)

console.time('parsing time')
parse()

function parse () {
  const file = files.shift()

  if (!file) {
    console.timeEnd('parsing time')
    console.log('total pages', total)
    return
  }

  console.log('parsing', file)

  // TODO: create a Readable stream from the file
  // TODO: pipe it to the saxophonist stream
  // TODO: for every object passed on by saxophonist, do total++
  // TODO: call parse when the saxophonist stream ends
  // HINT: you can use pump for both piping and detecting when it ends
}

