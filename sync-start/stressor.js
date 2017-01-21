'use strict'

var fs = require('fs')

// use this to parse the XML file
var parseString = require('xml2js').parseString

// count the total number of pages
var total = 0

// pass any numbers of files as arguments when you launch this
// Usage: node stressor file1 file2
// Example: node stressor wikipedia/enwiki-20151201-pages-meta-current1.xml-p000000010p000010000
// Example: node stressor wikipedia/*
var files = process.argv.splice(2)

// to display the time taken to process all files
console.time('parsing time')
parse()

function parse (err) {
  var file = files.shift()

  if (!file) {
    console.timeEnd('parsing time')
    console.log('total pages', total)
    return
  }

  console.log('parsing', file)

  fs.readFile(file, function (err, data) {
    if (err) {
      throw err
    }

    // TODO: parse the file, and then call parse()
  })
}
