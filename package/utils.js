const { isArray } = require("./constants");

const seprator = "/",
  trimEndExp = /\/?\$$/,
  trimVal = "/?$";

module.exports.formatPath = function formatPath(paths, handleExps) {
  if (isArray(paths)) return "(" + paths.map(formatPath).join("|") + ")";

  const pathNormailized = paths.split(seprator).filter(Boolean);
  if (handleExps !== true) return pathNormailized.join(seprator);
  else
    return pathNormailized
      .map(paramHandler)
      .join(seprator)
      .replace(trimEndExp, trimVal);
};

function paramHandler(str) {
  return str[0] === ":" ? "(?<" + str.slice(1) + ">[^/]+)" : str;
}
