const got = require('got')
const { parse } = require('jsonstream2')

const u = ''+
  'https://skimdb.npmjs.com/registry/' +
  '_changes?include_docs=true'

got.stream(u)
  .pipe(parse('results.*.id', (name) => name + '\n'))
  .pipe(process.stdout)
