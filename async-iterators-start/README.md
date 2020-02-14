## Prerequisites

This is a continutation of `streams-start` exercise, best to check that one out first before doing this.

Run `npm install` in this folder

## Exercise

In addition to parsing the XML, we're going to read the data and pull out the title and id from each page and write them to CSV file like so:

```
id,title
1,hello world
```

The `chunkToRow` function is already there for you.

Part 1:

1. Create a new `Transform` stream, that's going to recieve the parsed XML chunk and return the csv row.
2. Create the `fs.createWriteStream(filename)`
3. Pipe them together using `pipeline`

To test it:

* `npm run pipeline:one`: it will parse one file
* `npm run pipeline:all`: it will parse all files

Part 2: Async iterators

An alternative to creating a dedicated transform stream, you can instead iterate over each chunk, create the row and write it to the file directly.

1. Pipe the XML file to the `saxophonist` stream as before
2. After that iterate over it using `for await (const chunk of stream) {}` syntax
3. Pass the chunk to `chunkToRow` and write that your CSV file via `writable.write()`

To test it:

* `npm run iterator:one`: it will parse one file
* `npm run iterator:all`: it will parse all files

**Note**

`writable.write()` returns a boolean to indicate whether the internal Buffer for the stream is *less* than the `highWaterMark` set for the stream. When the boolean is `false` this indicates the stream is experiencing [backpressure](https://nodejs.org/es/docs/guides/backpressuring-in-streams/), we need to wait until the stream drains. The `writable` emits the `drain` event to indicate this.

```js
// callback version
writable.once('drain', goBackToWritingCb)
// promise version - async/await friendly
const { once } = require('events')
await once(writable, 'drain')
```

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

