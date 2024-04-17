import { createReadStream } from 'fs'

const stream = createReadStream(import.meta.filename, { encoding: 'utf8' })
for await (let chunk of stream) {
  console.log(chunk.toUpperCase())
}
