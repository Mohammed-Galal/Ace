const parseURL = require("url").parse,
  formatPath = require("../utils/formatPath"),
  SP = URLSearchParams,
  {
    seperator,
    enumerable,
    extentionExp,
    objFromEntries,
    freezeObj,
  } = require("../constants"),
  firstExp = "^/?";

module.exports = URL;

function URL(url) {
  const urlObj = parseURL(url),
    pathName = formatPath(urlObj.pathname),
    openRoutes = (this.openRoutes = []);
  this.port = urlObj.port;
  this.hostName = urlObj.hostName;
  this.hash = urlObj.hash;
  this.path = {
    name: pathName,
    get params() {
      return new RegExp(firstExp + openRoutes.join(seperator)).exec(pathName)
        .groups;
    },
  };
  this.query = {
    raw: urlObj.query,
    params: objFromEntries(new SP(urlObj.query)),
  };
}

URL.prototype.test = function ($path) {
  const openRoutes = this.openRoutes,
    path = this.path.name,
    pathExp = formatPath($path, true),
    regEx = new RegExp(firstExp + openRoutes.concat(pathExp).join(seperator));
  return regEx.test(path) && pathExp;
};

Object.defineProperty(URL.prototype, "isFilePath", {
  enumerable,
  get() {
    return extentionExp.test(this.path.name);
  },
});
freezeObj(URL.prototype);
