const fs = require("fs"),
  path = require("path"),
  resolvePath = path.resolve,
  getMimeType = require("mime-types").lookup;

module.exports = function ($path, headers) {
  $path = path.basename($path);
  const RES = this,
    targetPath = resolvePath(__dirname, "assets/" + $path),
    mime = getMimeType($path);

  fs.readFile(targetPath, function (err, data) {
    if (err) {
      RES.statusCode = 404;
    } else {
      const H = headers && headers instanceof Object ? headers : {};
      H["Content-Type"] = mime;
      RES.writeHead(200, H);
      RES.write(data);
    }
    RES.end();
  });
};
