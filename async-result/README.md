## Prerequisites

This exercise is built to learn how the memory allocation and garbage
collector works in node.

## Exercise

The `../wikipedia/` folder contains XML files from a Wikipedia dump, compressed in brotli.
Your task is to count how many pages are there, and extract the id and title of each.
The output should be in a `pages.csv` file.

Have a look at `stressor.js`, it contains a basic implementation for
processing throught the files, using a streaming parser
[saxophonist](http://npm.im/saxophonist).

An alternative to creating a dedicated transform stream, you can instead iterate over each chunk, create the row and write it to the file directly.

Create a `stream.pipeline()` with:

1. a `f.createReadStream()` to read the fil
2. brotli decoder
3. `saxophonist`
4. a transform async generator that takes a stream and yield the transformed chunks using `for await (const chunk of stream) {}` syntax; do the conversion `chunkToRow`
5. inside the transform, increase the total of the pages
3. the writable stream

To test it:

* `npm run iterator:one`: it will parse one file
* `npm run iterator:all`: it will parse all files

**Finishing up**

After iterating over each chunk, we can end the stream `writable.end()`, this indicates that no more data will be written to the `writable` stream. When everything is done done, the `finish` event will be emitted.

```js
writable.on('finish', cb)
// or
const stream = require('stream')
stream.finished(writable, cb)
// better yet...
const { promisify } = require('util')
const finished = promisify(stream.finished)
await finished(writable)
```

## Tracking mem

All examples are setup to allow memory monitoring with
[climem](http://npm.im/climem). Run in with `npm run climem`.

## Extra

You can avoid adding the last writable to the pipeline.
`writable.write()` returns a boolean to indicate whether the internal Buffer for the stream is *less* than the `highWaterMark` set for the stream. When the boolean is `false` this indicates the stream is experiencing [backpressure](https://nodejs.org/es/docs/guides/backpressuring-in-streams/), we need to wait until the stream drains. The `writable` emits the `drain` event to indicate this.

```js
// promise version - async/await friendly
const { once } = require('events')

if (!writable.write(chunk)) {
  await once(writable, 'drain')
}
```
