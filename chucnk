function chunkSubstr(str, size) {
  if (!str) {
    str = "<br>";
  }
  if (!size || size == 0) {
    return [str]
  }
  //console.log(str);
  //console.log(`${str.length} / ${size}`);
  const numChunks = Math.ceil(str.length / size)
  const chunks = new Array(numChunks)

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size)
  }
  //console.log("chunks Inner");
  //console.log(chunks);
  return chunks
}
