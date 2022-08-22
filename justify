// a function to justify text , it need as input a string and a number to cut the string, the function divide the initial string in a string with a x '/n'  
function justify(str, len) {


  /* len = 120; */
  var re = RegExp("(?:\\s|^)(.{1," + len + "})(?=\\s|$)", "g");
  var res = [];
  var finalResult = [];

  while ((m = re.exec(str)) !== null) {
    res.push(m[1]);
  }

  for (var i = 0; i < res.length - 1; i++) {
    if (res[i].indexOf(' ') != -1) {
      while (res[i].length < len) {
        for (var j = 0; j < res[i].length - 1; j++) {
          if (res[i][j] == ' ') {
            res[i] = res[i].substring(0, j) + " " + res[i].substring(j);
            if (res[i].length == len) break;
            while (res[i][j] == ' ') j++;
          }
        }
      }
    }
    finalResult.push(res[i]);
  }

  finalResult.push(res[res.length - 1]);

  return finalResult.join('\n');

}
