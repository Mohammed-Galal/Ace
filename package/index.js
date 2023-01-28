"use strict";

require("./request.js");
require("./response.js");
const http = require("http"),
  methods = require("fs").readdirSync("server"),
  mainHandler = require("./mainHandler"),
  { arrFrom, emptyStr, freezeObj, extentionExp } = require("./constants.js");

module.exports = function (assetsFolder) {
  const methodsInitialized = {};

  // get all methods initialized in the server folder and merge it with object above [methodsInitialized]
  methods.forEach(function (method) {
    methodsInitialized[
      method.toUpperCase().replace(extentionExp, emptyStr)
    ] = require("../server/" + method);
  });

  mainHandler.assetsFolder = assetsFolder;
  mainHandler.methodsInitialized = freezeObj(methodsInitialized);

  return mainHandler;
};

mainHandler.listen = function () {
  const server = http.createServer(mainHandler);
  server.listen.apply(server, arrFrom(arguments));
};
