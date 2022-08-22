function buildNotaTxt(txt, len) {

  if (!txt) {
    return "";
  }

  var ret = [];


  var tmp = txt.replace(/(?:\r\n|\r|\n)/g, '<br>');

  var arrayTmp = tmp.split("<br>");

  arrayTmp.forEach(br => {
    if (br.includes(" ")) {
      var chunks = justify(br, len);
      ret.push(chunks);
    } else {
      var chunks = chunkSubstr(br, len);
      ret.push(chunks.join("\n"));
    }
  });

  return ret.join("<br>");
}
