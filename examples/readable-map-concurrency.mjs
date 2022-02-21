import { Readable } from 'stream'
import { promisify } from 'util'

const sleep = promisify(setTimeout)

const requestUrls = ['nearform.com', 'nodejs.org', 'google.com', 'openjsf.org']
// Using simple async iterators with readable.map
for await (const body of Readable.from(requestUrls).map((url) => performRequest(url), { concurrency: 2 })) {
  console.log(body) // two request per time
}

async function performRequest (url) {
  console.log('Requesting...', url)
  await sleep(3000)
  return url
}
