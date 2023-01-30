const { fs, path, extentionExp, rootPath } = require("./constants"),
  resolvePath = path.resolve,
  getMimeType = require("mime-types").lookup,
  { data, route, resetRouteInfo } = require("./router");

const methodsInitialized = {};
module.exports = {
  app,
  methodsInitialized,
};

data.registeredMethods = Object.keys(methodsInitialized);

function app(req, res) {
  const pathname = resetRouteInfo(req),
    targetMethod = methodsInitialized[req.method];

  data.req = req;
  data.res = res;

  if (extentionExp.test(pathname)) {
    const filePath = resolvePath(rootPath + "/assets/" + pathname),
      mime = getMimeType(pathname);
    res.setHeader("Content-type", mime);
    if (fs.existsSync(filePath)) {
      res.statusCode = 200;
      res.write(fs.readFileSync(filePath));
    } else res.statusCode = 404;
  } else if (targetMethod) targetMethod(req, res, route);

  if (res.writableEnded === false) res.end();
}
