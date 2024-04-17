import fs from 'fs'
import { pipeline } from 'stream/promises'

await pipeline(
  fs.createReadStream(import.meta.filename),
  async function * (source) {
    for await (let chunk of source) {
      yield chunk.toString().toUpperCase()
    }
  },
  process.stdout
)
