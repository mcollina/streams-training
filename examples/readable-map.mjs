import { Readable } from 'stream'
import { promisify } from 'util'

const sleep = promisify(setTimeout)

const requestUrls = ['platformatic.dev', 'nodejs.org', 'google.com', 'openjsf.org']
// Using simple async iterators with readable.map
for await (const body of Readable.from(requestUrls).map((url) => performRequest(url))) {
  console.log(body) // one request per time
}

async function performRequest (url) {
  console.log('Requesting...', url)
  await sleep(3000)
  return url
}
