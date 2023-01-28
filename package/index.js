"use strict";

require("./request.js");
require("./response.js");
const http = require("http"),
  methods = require("fs").readdirSync("server"),
  mainHandler = require("./mainHandler"),
  { arrFrom, emptyStr, freezeObj } = require("./constants.js");

const extTrimmerExp = /\.[^]+$/;
module.exports = function (configObj) {
  const methodsInitialized = {};

  // get all methods initialized in the server folder and merge it with object above [methodsInitialized]
  methods.forEach(function (method) {
    methodsInitialized[
      method.toUpperCase().replace(extTrimmerExp, emptyStr)
    ] = require("../server/" + method);
  });

  Object.assign(mainHandler, configObj);
  mainHandler.methodsInitialized = freezeObj(methodsInitialized);

  return mainHandler;
};

mainHandler.listen = function () {
  http.createServer(mainHandler).listen(arrFrom(arguments));
};
