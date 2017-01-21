# parse wikipedia

This exercise is built to learn how the memory allocation and garbage
collector works in node.

## Prerequisites

Download [some wikipedia files](https://s3-eu-west-1.amazonaws.com/training-performant-node/wikipedia.tar.bz2), and unpack it in this folder.

Run `npm install` in this folder

## Exercise

The archive contains XML files from a Wikipedia dump, your task is to
count how many pages are there.

Have a look at `stressor.js`, it contains a basic implementation for
processing throught the files, using a streaming parser
[saxophonist](http://npm.im/saxophonist).

To test it:

* `npm run one`: it will parse one file
* `npm run two`: it will parse the same file twice
* `npm run all`: it will parse all files

## Tracking mem

All examples are setup to allow memory monitoring with
[climem](http://npm.im/climem). Run in with `npm run climem`.

## Questions

1) what is happening at the memory now? what does climem tells you?
2) how much time does it take for `npm run two` to complete? is it
   faster or slower than the sync approach? why?

## Bonus

Instead of the `parse()` recursion, use [never-ending-stream](http://npm.im/never-ending-stream) to
concatenate the (already parsed) streams.

Use [through2](http://npm.im/through2) to count the pages instead of
`on('data', function () {})`.

You can also track when a stream is finished with
[end-of-stream](http://npm.im/end-of-stream).
