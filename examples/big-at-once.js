const got = require('got')

const u = ''+
  'https://skimdb.npmjs.com/registry/' +
  '_changes?include_docs=true'

got(u)
  .then(res => {
    const recs = JSON.parse(res.body)
    let names = ''
    Object.keys(recs.results).forEach((key) => {
      names += recs.results[key].id + '\n'
    })
    console.log(names)
  })
  .catch(console.error)
