"use strict";

require("./request.js");
require("./response.js");

const http = require("http"),
  resolvePath = require("path").resolve,
  fs = require("fs");

const {
    arrFrom,
    emptyStr,
    freezeObj,
    extentionExp,
    rootPath,
  } = require("./constants.js"),
  methodsPath = resolvePath(rootPath + "/server"),
  methods = fs.readdirSync(methodsPath),
  mainHandler = require("./mainHandler");

module.exports = function (assetsFolder) {
  const methodsInitialized = {};

  // get all methods initialized in the server folder and merge it with object above [methodsInitialized]
  methods.forEach(function (method) {
    const M = method.toUpperCase().replace(extentionExp, emptyStr),
      methodPath = methodsPath + "/" + method;
    methodsInitialized[M] = require(methodPath);
  });

  mainHandler.assetsFolder = assetsFolder;
  mainHandler.methodsInitialized = freezeObj(methodsInitialized);

  return mainHandler;
};

mainHandler.listen = function () {
  const server = http.createServer(mainHandler);
  server.listen.apply(server, arrFrom(arguments));
};
