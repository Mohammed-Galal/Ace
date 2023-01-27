"use strict";

require("./request.js");
require("./response.js");
const http = require("http"),
  methods = require("fs").readdirSync("server"),
  mainHandler = require("./mainHandler"),
  { arrFrom, emptyStr, freezeObj } = require("./constants.js");

module.exports = function (port) {
  initMethods();
  if (port === undefined) return mainHandler;
  const server = http.createServer(mainHandler);
  server.listen.apply(server, arrFrom(arguments));
};

const extTrimmerExp = /\.[^]+$/;
function initMethods() {
  const methodsInitialized = {};

  // get all methods initialized in the server folder and merge it with object above [methodsInitialized]
  methods.forEach(function (method) {
    methodsInitialized[
      method.toUpperCase().replace(extTrimmerExp, emptyStr)
    ] = require("../server/" + method);
  });

  mainHandler.methodsInitialized = freezeObj(methodsInitialized);
}
