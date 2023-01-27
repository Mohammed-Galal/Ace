const JSX = require("./jsx.js"),
  res = (module.exports = require("http").ServerResponse.prototype),
  { freezeObj, emptyStr } = require("./constants.js");

res.jsx = freezeObj(JSX);
res.set = null; // setting header
res.download = null; // downloading a file
res.data = {}; // data holder

res.redirect = function (url) {
  this.statusCode = 302;
  this.setHeader("Location", url);
  this.end();
};

// const savedData = (res.savedData = {});
// res.save = function ($key, $value) {
//   const key = emptyStr + $key;
//   if (savedData[key] !== undefined) throw errors.savedData;
//   savedData[key] = $value;
// };
