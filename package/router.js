const { arrFrom } = require("./constants"),
  formatPath = require("./utils/formatPath"),
  err = new Error("");

module.exports = function (paths, $handler) {
  const self = this,
    openRoutes = self.openRoutes,
    args = arrFrom(arguments).filter(Boolean),
    length = args.length;

  if (length === 0 || length > 2) throw err;

  const pathsType = paths.constructor.name;

  if (pathsType === "Function") return paths(self);

  let isMatched = null;
  if (pathsType === "Object") {
    const routes = Object.keys(paths);
    routes.forEach(function (r) {
      if (isMatched === null) isMatched = self.route(r, paths[r]);
    });
    return isMatched;
  }

  const path = formatPath(paths, true),
    regEx = new RegExp("^/?" + openRoutes.concat(path).join("/"));
  isMatched = regEx.exec(self.path);
  if (isMatched === null) return isMatched;
  self.matchedRoutes.push(paths);
  const prevParams = self.params;
  self.params = isMatched.groups;
  openRoutes.push(path);
  const handlerResult = $handler(self);
  openRoutes.pop();
  self.params = prevParams;
  return handlerResult;
};
