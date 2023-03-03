const { isArray, seperator } = require("../constants");

const trimEndExp = /\/?\$$/,
  trimVal = "/?$";

module.exports = function formatPath(paths, handleExps) {
  if (isArray(paths)) return "(" + paths.map(formatPath).join("|") + ")";

  const pathNormailized = paths.split(seperator);
  if (handleExps !== true) return pathNormailized.join(seperator);
  else
    return pathNormailized
      .map(paramHandler)
      .join(seperator)
      .replace(trimEndExp, trimVal);
};

function paramHandler(str) {
  return str[0] === ":" ? "(?<" + str.slice(1) + ">[^/]+)" : str;
}
