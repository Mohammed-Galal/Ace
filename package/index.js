"use strict";

require("./request.js");
require("./response.js");

const http = require("http"),
  resolvePath = require("path").resolve,
  fs = require("fs");

const { arrFrom, emptyStr, extentionExp, rootPath } = require("./constants.js"),
  methodsPath = resolvePath(rootPath + "/server"),
  methods = fs.readdirSync(methodsPath),
  { methodsInitialized, app: mainHandler } = require("./application");

module.exports = function () {
  // get all methods initialized in the server folder and merge it with object above [methodsInitialized]
  methods.forEach(function (method) {
    const M = method.toUpperCase().replace(extentionExp, emptyStr),
      methodPath = methodsPath + "/" + method;
    methodsInitialized[M] = require(methodPath);
  });

  if (arguments.length > 0) {
    const server = http.createServer(mainHandler);
    server.listen.apply(server, arrFrom(arguments));
  } else return mainHandler;
};
