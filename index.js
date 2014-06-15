module.exports = len;

function len (doc) {
  var parts = doc.split(/\}\,\{.*\}\]\,/g);
  var headers = parts.map(function (line) {
    return line.split('\n')[0];
  }).join('\n');

  var result = [];

  parts.slice(1).forEach(function (p) {
    var id = p.split(':')[0];
    var end = doc.indexOf('":' + id);
    var start = end;
    var percent = '%' + (parseInt(p.length * 100 / doc.length));

    while (doc.charAt(--start) != '"');

    result.push({
      percent: percent,
      name: doc.slice(start + 1, end),
      id: id,
      len: p.length
    });
  });

  return result.sort(function (a, b) {
    if (a.len > b.len) return -1;
    if (a.len < b.len) return 1;
    return 0;
  });
}
