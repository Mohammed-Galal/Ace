const { fs, path, rootPath } = require("../../package/constants"),
  resolvePath = path.resolve,
  getMimeType = require("mime-types").lookup;

module.exports = function (req, res, route) {
  console.log(route.isFilePath, route.path);

  if (route.isFilePath) {
    const filePath = resolvePath(rootPath + "/assets/" + route.path),
      mime = getMimeType(path);
    res.setHeader("Content-type", mime);
    if (fs.existsSync(filePath)) {
      res.statusCode = 200;
      res.write(fs.readFileSync(filePath));
    } else res.statusCode = 404;
  }

  route({
    "/1": () => res.write("first route"),
    "/2": () => res.write("second route"),
  });

  route("api/:id", handler);

  if (!res.writableEnded) res.end();
};

function handler(req, res, route) {
  // console.log(route);
  console.log(
    route.hostName,
    route.ip,
    route.port,
    route.path,
    route.params,
    route.queryParams
  );

  route("inner", () => console.log("inner"));
}
