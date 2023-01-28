const fs = require("fs"),
  resolvePath = require("path").resolve,
  getMimeType = require("mime-types").lookup,
  url = require("url").parse,
  { isArray, extentionExp, rootPath } = require("./constants");

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

    if (extentionExp.test(pathname)) {
      const filePath = resolvePath(rootPath + "/assets/" + pathname),
        mime = getMimeType(pathname);
      res.setHeader("Content-type", mime);

      if (fs.existsSync(filePath)) {
        res.statusCode = 200;
        res.write(fs.readFileSync(filePath));
      } else res.statusCode = 404;
    } else if (targetMethod) targetMethod(req, res, app.route);

    if (res.writableEnded === false) res.end();
  });

const openRoutes = [],
  route = (app.route = function (paths, $handler) {
    if (app.res.writableEnded)
      return console.error(
        "cannot handle ",
        paths,
        "because the response object has ended"
      );
    else if (arguments.length < 2) throw errors.route.missingArgs;
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

const seprator = "/",
  trimEndExp = /\/?\$$/,
  trimVal = "/?$";
function formatPath(paths, handleExps) {
  if (isArray(paths)) return "(" + paths.map(formatPath).join("|") + ")";

  const pathNormailized = paths.split(seprator).filter(Boolean);
  if (handleExps !== true) return pathNormailized.join(seprator);
  else
    return pathNormailized
      .map(paramHandler)
      .join(seprator)
      .replace(trimEndExp, trimVal);
}

function paramHandler(str) {
  return str[0] === ":" ? "(?<" + str.slice(1) + ">[^/]+)" : str;
}
