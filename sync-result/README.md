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
processing throught the files, one at a time in a synchronous way using
[xml2js](http://npm.im/xml2js).

To test it:

* `npm run one`: it will parse one file
* `npm run two`: it will parse the same file twice
* `npm run all`: it will parse all files

## Tracking mem

All examples are setup to allow memory monitoring with
[climem](http://npm.im/climem). Run them with `npm run climem`.

## Questions

1) where you able to run `npm run all`?
2) where you able to track memory?
3) Why `climem` is not displaying any data?
4) how much memory is being held by your process while it is parsing?
5) how much time does it take for `npm run two` to complete?
