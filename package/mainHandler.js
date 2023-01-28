const fs = require("fs"),
  url = require("url").parse,
  { isArray, emptyStr, extentionExp: hasExtentionExp } = require("./constants");

const app = (module.exports = function (req, res) {
  const parsedURL = url(req.url),
    targetMethod = app.methodsInitialized[req.method],
    pathname = (app.reqPath = parsedURL.pathname);

  app.req = req;
  app.res = res;
  app.pathParams = req.pathParams;
  app.queryParams = {};

  if (hasExtentionExp.test(req.url)) {
    const base = emptyStr + app.assetsFolder,
      filePath = __dirname + base + pathname;
    fs.readFile(filePath, filePathCallback);
  } else if (targetMethod) targetMethod(req, res, app.route);
  else {
    //set 404 error
  }

  if (res.writableEnded === false) res.end();
});

const matchedRoutes = [],
  openRoutes = [],
  route = (app.route = function (paths, $handler) {
    if (arguments.length < 2) throw errors.route.missingArgs;
    else if (typeof paths !== "string" && !isArray(paths))
      throw errors.route.path;
    else if (typeof $handler !== "function") throw errors.route.handler;

    const path = formatPath(paths),
      regEx = new RegExp("^/?" + openRoutes.concat(path).join("/"), "g"),
      isMatched = regEx.exec(app.reqPath);

    if (isMatched === null) return false;
    else if (isMatched.groups) Object.assign(app.pathParams, isMatched.groups);

    matchedRoutes.push(paths);
    openRoutes.push(path);
    $handler(app.req, app.res, route);
    openRoutes.pop();

    return true;
  });

route.matchedRoutes = matchedRoutes;

function formatPath(paths) {
  if (isArray(paths)) return "(" + paths.map(formatPath).join("|") + ")";
  return paths.replace(/\:[^/]+/g, (m) => "(?<" + m.slice(1) + ">[^/]+)");
}

function filePathCallback(err, content) {
  const res = app.res;
  if (err) {
    res.statusCode = 404;
    res.end();
  } else {
    const mime = "";
    res.statusCode = 200;
    res.setHeader("Content-type", mime);
    res.end(content);
  }
}
