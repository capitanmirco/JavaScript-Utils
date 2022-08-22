function isNullOrWhitespace(str) {

  if (!str) return true;

  return str === null || str.match(/^ *$/) !== null;
}
