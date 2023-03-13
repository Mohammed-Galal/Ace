/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => {
  // webpackBootstrap
  /******/ var __webpack_modules__ = {
    /***/ "./addons/request/index.js":
      /*!*********************************!*\
  !*** ./addons/request/index.js ***!
  \*********************************/
      /***/ (module) => {
        eval(
          "module.exports = {};\r\n\n\n//# sourceURL=webpack://my-webpack-project/./addons/request/index.js?"
        );

        /***/
      },

    /***/ "./addons/response/index.js":
      /*!**********************************!*\
  !*** ./addons/response/index.js ***!
  \**********************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'module.exports = {\r\n  redirect: __webpack_require__(/*! ./redirect */ "./addons/response/redirect.js"),\r\n  sendFile: __webpack_require__(/*! ./sendFile */ "./addons/response/sendFile.js"),\r\n};\r\n\n\n//# sourceURL=webpack://my-webpack-project/./addons/response/index.js?'
        );

        /***/
      },

    /***/ "./addons/response/redirect.js":
      /*!*************************************!*\
  !*** ./addons/response/redirect.js ***!
  \*************************************/
      /***/ (module) => {
        eval(
          'module.exports = function (url) {\r\n  this.statusCode = 302;\r\n  this.setHeader("Location", url);\r\n  this.end();\r\n};\r\n\n\n//# sourceURL=webpack://my-webpack-project/./addons/response/redirect.js?'
        );

        /***/
      },

    /***/ "./addons/response/sendFile.js":
      /*!*************************************!*\
  !*** ./addons/response/sendFile.js ***!
  \*************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const fs = __webpack_require__(/*! fs */ "fs");\r\nconst path = __webpack_require__(/*! path */ "path");\r\nconst mimeTypes = __webpack_require__(/*! mime-types */ "./node_modules/mime-types/index.js");\r\n\r\nconst resolvePath = path.resolve,\r\n  getMimeType = mimeTypes.lookup;\r\n\r\nmodule.exports = function ($path, headers) {\r\n  $path = path.basename($path);\r\n  const RES = this,\r\n    targetPath = resolvePath(__dirname, "assets/" + $path),\r\n    mime = getMimeType($path);\r\n\r\n  fs.readFile(targetPath, function (err, data) {\r\n    if (err) {\r\n      RES.statusCode = 404;\r\n    } else {\r\n      const H = headers && headers instanceof Object ? headers : {};\r\n      H["Content-Type"] = mime;\r\n      RES.writeHead(200, H);\r\n      RES.write(data);\r\n    }\r\n    RES.end();\r\n  });\r\n};\r\n\n\n//# sourceURL=webpack://my-webpack-project/./addons/response/sendFile.js?'
        );

        /***/
      },

    /***/ "./app/config.js":
      /*!***********************!*\
  !*** ./app/config.js ***!
  \***********************/
      /***/ (
        __unused_webpack_module,
        __unused_webpack_exports,
        __webpack_require__
      ) => {
        eval(
          'const ace = __webpack_require__(/*! ace */ "./package/index.js");\r\n\r\nace(8000, () => console.log("http://localhost:8000"));\r\n\n\n//# sourceURL=webpack://my-webpack-project/./app/config.js?'
        );

        /***/
      },

    /***/ "./package/Container/UniformResourceLocator.js":
      /*!*****************************************************!*\
  !*** ./package/Container/UniformResourceLocator.js ***!
  \*****************************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const parseURL = (__webpack_require__(/*! url */ "url").parse),\r\n  SP = URLSearchParams,\r\n  {\r\n    seperator,\r\n    isArray,\r\n    enumerable,\r\n    extentionExp,\r\n    objFromEntries,\r\n    freezeObj,\r\n  } = __webpack_require__(/*! ../constants */ "./package/constants.js"),\r\n  firstExp = "^/?";\r\n\r\nconst trimEndExp = /\\/?\\$$/,\r\n  trimVal = "/?$";\r\n\r\nmodule.exports = UniformResourceLocator;\r\n\r\nfunction UniformResourceLocator(url) {\r\n  const urlObj = parseURL(url),\r\n    pathName = formatPath(urlObj.pathname),\r\n    openRoutes = (this.openRoutes = []);\r\n  this.hash = urlObj.hash;\r\n  this.path = {\r\n    name: pathName,\r\n    get params() {\r\n      return new RegExp(firstExp + openRoutes.join(seperator)).exec(pathName)\r\n        .groups;\r\n    },\r\n  };\r\n  this.query = {\r\n    raw: urlObj.query,\r\n    params: objFromEntries(new SP(urlObj.query)),\r\n  };\r\n}\r\n\r\nfunction formatPath(paths, handleExps) {\r\n  if (isArray(paths)) return "(" + paths.map(formatPath).join("|") + ")";\r\n  const path = paths.replace(trimEndExp, trimVal),\r\n    pathNormailized = path.split(seperator);\r\n  if (handleExps !== true) return pathNormailized.join(seperator);\r\n  else return pathNormailized.map(paramHandler).join(seperator);\r\n}\r\n\r\nfunction paramHandler(str) {\r\n  return str[0] === ":" ? "(?<" + str.slice(1) + ">[^/]+)" : str;\r\n}\r\n\r\nUniformResourceLocator.prototype.test = function ($path) {\r\n  const openRoutes = this.openRoutes,\r\n    path = this.path.name,\r\n    pathExp = formatPath($path, true),\r\n    regEx = new RegExp(firstExp + openRoutes.concat(pathExp).join(seperator));\r\n  return regEx.test(path) && pathExp;\r\n};\r\n\r\nObject.defineProperty(UniformResourceLocator.prototype, "isFilePath", {\r\n  enumerable,\r\n  get() {\r\n    return extentionExp.test(this.path.name);\r\n  },\r\n});\r\nfreezeObj(URL.prototype);\r\n\n\n//# sourceURL=webpack://my-webpack-project/./package/Container/UniformResourceLocator.js?'
        );

        /***/
      },

    /***/ "./package/Container/index.js":
      /*!************************************!*\
  !*** ./package/Container/index.js ***!
  \************************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const URL = __webpack_require__(/*! ./UniformResourceLocator */ "./package/Container/UniformResourceLocator.js"),\r\n  { enumerable, freezeObj } = __webpack_require__(/*! ../constants */ "./package/constants.js"),\r\n  MapPolyfill = __webpack_require__(/*! ./mapPolyfill */ "./package/Container/mapPolyfill.js"),\r\n  router = __webpack_require__(/*! ./router */ "./package/Container/router.js");\r\n\r\nmodule.exports = CONTAINER;\r\n\r\nfunction CONTAINER(req, res) {\r\n  this.__proto__.req = req;\r\n  this.__proto__.res = res;\r\n  this.clues = new MapPolyfill();\r\n  this.matchedRoutes = [];\r\n  this.url = new URL(req.url);\r\n  this.host = req.headers.host;\r\n  this.route = router.bind(this);\r\n  freezeObj(this.url);\r\n}\r\n\r\nObject.defineProperties(CONTAINER.prototype, {\r\n  port: {\r\n    enumerable,\r\n    get() {\r\n      return this.host.match(/(?<=\\:)\\d+$/)[0];\r\n    },\r\n  },\r\n  ip: {\r\n    enumerable,\r\n    get() {\r\n      return this.req.headers["x-forwarded-for"];\r\n    },\r\n  },\r\n  subdomains: {\r\n    enumerable,\r\n    get() {\r\n      return this.host.split(".").slice(0, -1);\r\n    },\r\n  },\r\n});\r\n\n\n//# sourceURL=webpack://my-webpack-project/./package/Container/index.js?'
        );

        /***/
      },

    /***/ "./package/Container/mapPolyfill.js":
      /*!******************************************!*\
  !*** ./package/Container/mapPolyfill.js ***!
  \******************************************/
      /***/ (module) => {
        eval(
          'function Clues() {}\r\nmodule.exports = Clues;\r\nconst proto = Clues.prototype,\r\n  err = new Error(),\r\n  messages = {\r\n    clueIsExsisted: "this clue is previously created".toUpperCase(),\r\n    undefinedClue: "this clue is undefined".toUpperCase(),\r\n  },\r\n  setErrorData = function (CK, type) {\r\n    err.name = CK;\r\n    err.message = messages[type];\r\n    return err;\r\n  };\r\n\r\nproto.create = function (CK) {\r\n  if (this[CK] !== undefined) throw setErrorData(CK, "clueIsExsisted");\r\n  this[CK] = null;\r\n};\r\n\r\nproto.set = function (key, val) {\r\n  if (this[key] === undefined) throw setErrorData(CK, "undefinedClue");\r\n  this[key] =\r\n    (val !== undefined && val.constructor.name) === "Function"\r\n      ? val(this[key])\r\n      : val;\r\n  return this[key];\r\n};\r\n\r\nproto.get = function (key) {\r\n  if (this[key] === undefined) throw setErrorData(CK, "undefinedClue");\r\n  return this[key];\r\n};\r\n\r\nproto.delete = function (key) {\r\n  if (this[key] === undefined) throw setErrorData(CK, "undefinedClue");\r\n  delete this[key];\r\n};\r\n\r\nproto.has = function (key) {\r\n  return this[key] !== undefined;\r\n};\r\n\r\nproto.forEach = function (fn) {\r\n  this.keys.forEach(fn, this);\r\n};\r\n\r\nproto.clear = function () {\r\n  const that = this;\r\n  this.forEach(function (prop) {\r\n    delete that[prop];\r\n  });\r\n};\r\n\r\nproto.json = function () {\r\n  return JSON.stringify(this);\r\n};\r\n\r\nObject.defineProperties(proto, {\r\n  keys: {\r\n    enumerable: true,\r\n    get() {\r\n      return Object.keys(this);\r\n    },\r\n  },\r\n\r\n  length: {\r\n    enumerable: true,\r\n    get() {\r\n      return this.keys.length;\r\n    },\r\n  },\r\n});\r\n\n\n//# sourceURL=webpack://my-webpack-project/./package/Container/mapPolyfill.js?'
        );

        /***/
      },

    /***/ "./package/Container/router.js":
      /*!*************************************!*\
  !*** ./package/Container/router.js ***!
  \*************************************/
      /***/ (module) => {
        eval(
          'const err = new Error("");\r\n\r\nmodule.exports = function (paths, $handler) {\r\n  const self = this,\r\n    pathsType = paths.constructor.name;\r\n\r\n  if (pathsType === "Function") return paths(self);\r\n  else if (pathsType === "Object") {\r\n    let isMatched = false;\r\n    const routes = Object.keys(paths);\r\n    routes.forEach(function (r) {\r\n      if (isMatched === false) isMatched = self.route(r, paths[r]);\r\n    });\r\n    return isMatched;\r\n  }\r\n\r\n  const url = self.url,\r\n    pathExp = url.test(paths);\r\n  if (pathExp === false) return false;\r\n  self.matchedRoutes.push(paths);\r\n  url.openRoutes.push(pathExp);\r\n  const handlerResult = $handler(self);\r\n  url.openRoutes.pop();\r\n  return handlerResult;\r\n};\r\n\n\n//# sourceURL=webpack://my-webpack-project/./package/Container/router.js?'
        );

        /***/
      },

    /***/ "./package/constants.js":
      /*!******************************!*\
  !*** ./package/constants.js ***!
  \******************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const http = __webpack_require__(/*! http */ "http"),\r\n  extentionExp = /\\..+$/,\r\n  emptyStr = "";\r\n\r\nmodule.exports = {\r\n  http,\r\n\r\n  seperator: "/",\r\n  enumerable: true,\r\n  extentionExp,\r\n  emptyStr,\r\n\r\n  objFromEntries: Object.fromEntries,\r\n  freezeObj: Object.freeze,\r\n  isArray: Array.isArray,\r\n  arrFrom: Array.from,\r\n  Num: Number.parseInt,\r\n  isNaN: Number.isNaN,\r\n};\r\n\n\n//# sourceURL=webpack://my-webpack-project/./package/constants.js?'
        );

        /***/
      },

    /***/ "./package/index.js":
      /*!**************************!*\
  !*** ./package/index.js ***!
  \**************************/
      /***/ (module, __unused_webpack_exports, __webpack_require__) => {
        eval(
          'const {\r\n    http,\r\n    arrFrom,\r\n    freezeObj,\r\n    extentionExp,\r\n    emptyStr,\r\n  } = __webpack_require__(/*! ./constants */ "./package/constants.js"),\r\n  fs = __webpack_require__(/*! fs */ "fs"),\r\n  CONTAINER = __webpack_require__(/*! ./Container */ "./package/Container/index.js");\r\n\r\nObject.assign(http.IncomingMessage.prototype, __webpack_require__(/*! reqProto */ "./addons/request/index.js"));\r\nObject.assign(http.ServerResponse.prototype, __webpack_require__(/*! resProto */ "./addons/response/index.js"));\r\n\r\nmodule.exports = function () {\r\n  if (arguments.length === 0) return mainHandler;\r\n  const server = http.createServer(mainHandler);\r\n  server.listen.apply(server, arrFrom(arguments));\r\n};\r\n\r\nconst methodsInitialized = {},\r\n  methodsPath = "server",\r\n  methods = (CONTAINER.prototype.method = freezeObj(\r\n    fs\r\n      .readdirSync(__dirname + "/" + methodsPath)\r\n      .map(initMethod)\r\n      .filter((m) => m !== "INDEX")\r\n  )),\r\n  accessControlAllowMethods = methods.toString();\r\n\r\nfunction mainHandler(req, res) {\r\n  res.setHeader("access-control-allow-methods", accessControlAllowMethods);\r\n\r\n  const targetMethod = methodsInitialized[req.method],\r\n    CN = freezeObj(new CONTAINER(req, res));\r\n\r\n  if (targetMethod !== undefined) targetMethod(CN);\r\n  else {\r\n    if (methodsInitialized.NOTFOUND) methodsInitialized.NOTFOUND(CN);\r\n    else {\r\n    }\r\n  }\r\n}\r\n\r\nfunction initMethod(method) {\r\n  // get all methods initialized in the server folder and merge it with object above [methodsInitialized]\r\n  const M = method.toUpperCase().replace(extentionExp, emptyStr);\r\n  methodsInitialized[M] = require("./server/" + method);\r\n  return M;\r\n}\r\n\n\n//# sourceURL=webpack://my-webpack-project/./package/index.js?'
        );

        /***/
      },

    /***/ fs:
      /*!*********************!*\
  !*** external "fs" ***!
  \*********************/
      /***/ (module) => {
        "use strict";
        module.exports = require("fs");

        /***/
      },

    /***/ http:
      /*!***********************!*\
  !*** external "http" ***!
  \***********************/
      /***/ (module) => {
        "use strict";
        module.exports = require("http");

        /***/
      },

    /***/ path:
      /*!***********************!*\
  !*** external "path" ***!
  \***********************/
      /***/ (module) => {
        "use strict";
        module.exports = require("path");

        /***/
      },

    /***/ url:
      /*!**********************!*\
  !*** external "url" ***!
  \**********************/
      /***/ (module) => {
        "use strict";
        module.exports = require("url");

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__
    );
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/ __webpack_require__.m = __webpack_modules__;
  /******/
  /******/ // the startup function
  /******/ __webpack_require__.x = () => {
    /******/ // Load entry module and return exports
    /******/ // This entry module depends on other loaded chunks and execution need to be delayed
    /******/ var __webpack_exports__ = __webpack_require__.O(
      undefined,
      ["module-node_modules_mime-types_index_js"],
      () => __webpack_require__("./app/config.js")
    );
    /******/ __webpack_exports__ = __webpack_require__.O(__webpack_exports__);
    /******/ return __webpack_exports__;
    /******/
  };
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/chunk loaded */
  /******/ (() => {
    /******/ var deferred = [];
    /******/ __webpack_require__.O = (result, chunkIds, fn, priority) => {
      /******/ if (chunkIds) {
        /******/ priority = priority || 0;
        /******/ for (
          var i = deferred.length;
          i > 0 && deferred[i - 1][2] > priority;
          i--
        )
          deferred[i] = deferred[i - 1];
        /******/ deferred[i] = [chunkIds, fn, priority];
        /******/ return;
        /******/
      }
      /******/ var notFulfilled = Infinity;
      /******/ for (var i = 0; i < deferred.length; i++) {
        /******/ var [chunkIds, fn, priority] = deferred[i];
        /******/ var fulfilled = true;
        /******/ for (var j = 0; j < chunkIds.length; j++) {
          /******/ if (
            (priority & (1 === 0) || notFulfilled >= priority) &&
            Object.keys(__webpack_require__.O).every((key) =>
              __webpack_require__.O[key](chunkIds[j])
            )
          ) {
            /******/ chunkIds.splice(j--, 1);
            /******/
          } else {
            /******/ fulfilled = false;
            /******/ if (priority < notFulfilled) notFulfilled = priority;
            /******/
          }
          /******/
        }
        /******/ if (fulfilled) {
          /******/ deferred.splice(i--, 1);
          /******/ var r = fn();
          /******/ if (r !== undefined) result = r;
          /******/
        }
        /******/
      }
      /******/ return result;
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/ensure chunk */
  /******/ (() => {
    /******/ __webpack_require__.f = {};
    /******/ // This file contains only the entry chunk.
    /******/ // The chunk loading function for additional chunks
    /******/ __webpack_require__.e = (chunkId) => {
      /******/ return Promise.all(
        Object.keys(__webpack_require__.f).reduce((promises, key) => {
          /******/ __webpack_require__.f[key](chunkId, promises);
          /******/ return promises;
          /******/
        }, [])
      );
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/get javascript chunk filename */
  /******/ (() => {
    /******/ // This function allow to reference async chunks and sibling chunks for the entrypoint
    /******/ __webpack_require__.u = (chunkId) => {
      /******/ // return url for filenames not based on template
      /******/ if (chunkId === "module-node_modules_mime-types_index_js")
        return "modules/" + chunkId + ".js";
      /******/ // return url for filenames based on template
      /******/ return undefined;
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/require chunk loading */
  /******/ (() => {
    /******/ // no baseURI
    /******/
    /******/ // object to store loaded chunks
    /******/ // "1" means "loaded", otherwise not loaded yet
    /******/ var installedChunks = {
      /******/ index: 1,
      /******/
    };
    /******/
    /******/ __webpack_require__.O.require = (chunkId) =>
      installedChunks[chunkId];
    /******/
    /******/ var installChunk = (chunk) => {
      /******/ var moreModules = chunk.modules,
        chunkIds = chunk.ids,
        runtime = chunk.runtime;
      /******/ for (var moduleId in moreModules) {
        /******/ if (__webpack_require__.o(moreModules, moduleId)) {
          /******/ __webpack_require__.m[moduleId] = moreModules[moduleId];
          /******/
        }
        /******/
      }
      /******/ if (runtime) runtime(__webpack_require__);
      /******/ for (var i = 0; i < chunkIds.length; i++)
        /******/ installedChunks[chunkIds[i]] = 1;
      /******/ __webpack_require__.O();
      /******/
    };
    /******/
    /******/ // require() chunk loading for javascript
    /******/ __webpack_require__.f.require = (chunkId, promises) => {
      /******/ // "1" is the signal for "already loaded"
      /******/ if (!installedChunks[chunkId]) {
        /******/ if (true) {
          // all chunks have JS
          /******/ installChunk(require("./" + __webpack_require__.u(chunkId)));
          /******/
        } else installedChunks[chunkId] = 1;
        /******/
      }
      /******/
    };
    /******/
    /******/ // no external install chunk
    /******/
    /******/ // no HMR
    /******/
    /******/ // no HMR manifest
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/startup chunk dependencies */
  /******/ (() => {
    /******/ var next = __webpack_require__.x;
    /******/ __webpack_require__.x = () => {
      /******/ __webpack_require__.e("module-node_modules_mime-types_index_js");
      /******/ return next();
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  /******/
  /******/ // run startup
  /******/ var __webpack_exports__ = __webpack_require__.x();
  /******/
  /******/
})();
