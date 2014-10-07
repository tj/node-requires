
/**
 * Expose `requires`.
 */

module.exports = requires;

/**
 * Parse requires in `str`.
 *
 * @param {String} str
 * @param {Function} [fn]
 * @return {Array}
 * @api public
 */

function requires(str, fn) {
  if (fn) return map(str, fn);
  var re = /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
  var ret = [];
  var m;

  str = replaceComments(str);
  while (m = re.exec(str)) {
    ret.push({
      string: m[0],
      path: m[1],
      index: m.index
    });
  }

  return ret;
}

/**
 * Map requires.
 */

function map(str, fn) {
  var result = '';
  var offset = 0;

  requires(str).forEach(function(r) {
    var start = r.index - offset;
    var end = start + r.string.length;

    result += str.substr(0, start);
    result += fn(r);
    offset += end;
    str = str.substr(end);
  });
  result += str;

  return result;
}

/**
 * Replace comments with blanks to preserve offsets
 */

function replaceComments(str) {
  return str.replace(/\/\*[\S\s]*?\*\/|\/\/.*/g, function(match) {
    return Array(match.length + 1).join(' ');
  });
}
