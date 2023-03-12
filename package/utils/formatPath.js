const { isArray, seperator } = require("../constants");

const trimEndExp = /\/?\$$/,
  trimVal = "/?$";

module.exports = function formatPath(paths, handleExps) {
  if (isArray(paths)) return "(" + paths.map(formatPath).join("|") + ")";
  const path = paths.replace(trimEndExp, trimVal),
    pathNormailized = path.split(seperator);
  if (handleExps !== true) return pathNormailized.join(seperator);
  else return pathNormailized.map(paramHandler).join(seperator);
};

function paramHandler(str) {
  return str[0] === ":" ? "(?<" + str.slice(1) + ">[^/]+)" : str;
}
