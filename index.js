
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
  var re = /require *\(['"]([^'"]+)['"]\)/g;
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
  requires(str).forEach(function(r){
    str = str.replace(r.string, fn(r));
  });

  return str;
}

/**
 * Replace comments with blanks to preserve offsets
 */

function replaceComments(str) {
  return str.replace(/\/\*[\S\s]*?\*\/|\/\/.*/g, function(match) {
    return Array(match.length + 1).join(' ');
  });
}
