const res = await fetch('https://platformatic.dev')

const stream = res.body
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(new TransformStream({
    transform(chunk, controller) {
      controller.enqueue(chunk.toUpperCase())
    }
  }))

for await (const chunk of stream) {
  console.log(chunk)
}
