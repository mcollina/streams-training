import { setTimeout as sleep } from 'timers/promises'

async function * generate () {
  yield 'hello'
  await sleep(10)
  yield ' '
  await sleep(10)
  yield 'world'
}

Readable.from(generate()).on('data', chunk => console.log(chunk))
