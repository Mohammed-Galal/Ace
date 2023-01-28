const fs = require("fs"),
  getMimeType = require("mime-types").lookup,
  url = require("url").parse,
  { isArray, emptyStr, extentionExp: hasExtentionExp } = require("./constants");

const matchedRoutes = [],
  app = (module.exports = function (req, res) {
    const parsedURL = url(req.url),
      targetMethod = app.methodsInitialized[req.method],
      pathname = (app.reqPath = formatPath(parsedURL.pathname));

    matchedRoutes.length = 0;

    app.req = req;
    app.res = res;
    app.pathParams = req.pathParams;
    app.queryParams = {};

    if (hasExtentionExp.test(pathname)) {
      const base = emptyStr + app.assetsFolder,
        filePath = __dirname + base + pathname;
      fs.readFile(filePath, filePathCallback);
    } else if (targetMethod) targetMethod(req, res, app.route);
    else {
      //set 404 error
    }

    if (res.writableEnded === false) res.end();
  });

function filePathCallback(err, content) {
  const reqPath = app.reqPath,
    res = app.res;
  if (err) {
    res.statusCode = 404;
    res.end();
  } else {
    res.statusCode = 200;
    const mime = getMimeType(reqPath);
    res.setHeader("Content-type", mime);
    res.end(content);
  }
}

const openRoutes = [],
  route = (app.route = function (paths, $handler) {
    if (arguments.length < 2) throw errors.route.missingArgs;
    else if (typeof paths !== "string" && !isArray(paths))
      throw errors.route.path;
    else if (typeof $handler !== "function") throw errors.route.handler;

    const path = formatPath(paths, true),
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
route.registeredMethods = function () {
  return Object.keys(app.methodsInitialized);
};

const seprator = "/";
function formatPath(paths, handleExps) {
  if (isArray(paths)) return "(" + paths.map(formatPath).join("|") + ")";

  const pathNormailized = paths.split(seprator).filter(Boolean);
  if (handleExps !== true) return pathNormailized.join(seprator);
  else
    return pathNormailized
      .map(paramHandler)
      .join(seprator)
      .replace(/\/?\$$/, "/?$");
}

function paramHandler(str) {
  return str[0] === ":" ? "(?<" + str.slice(1) + ">[^/]+)" : str;
}
