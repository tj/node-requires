
/**
 * Expose `requires`.
 */

module.exports = requires;

/**
 * Parse requires in `str`.
 *
 * @param {String} str
 * @return {Array}
 * @api public
 */

function requires(str) {
  var re = /require *\(['"]([^'"]+)['"]\)/g;
  var ret = [];
  var m;

  while (m = re.exec(str)) {
    ret.push({
      string: m[0],
      path: m[1],
      index: m.index
    });
  }

  return ret;
}