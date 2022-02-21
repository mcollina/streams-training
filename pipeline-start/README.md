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

1. Create a new `Transform` stream, that's going to receive the parsed XML chunk and return the csv row.
2. Create the `fs.createWriteStream(filename)`
3. Pipe them together using `pipeline`

To test it:

* `npm run pipeline:one`: it will parse one file
* `npm run pipeline:all`: it will parse all files

## Tracking mem

All examples are setup to allow memory monitoring with climem. Run in with `npm run climem`.
