import { setTimeout as sleep } from 'timers/promises'

async function * generate () {
  yield 'hello'
  await sleep(10)
  yield ' '
  await sleep(10)
  yield 'world'
}

async function consume (iterator) {
  let strings = ''
  for await (let chunk of iterator) {
    strings += chunk
  }
  return strings
}

// output "hello world"
console.log(await consume(generate()))
