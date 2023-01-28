const JSX = require("./jsx.js"),
  res = (module.exports = require("http").ServerResponse.prototype),
  { freezeObj, emptyStr } = require("./constants.js");

res.jsx = freezeObj(JSX);

res.redirect = function (url) {
  this.statusCode = 302;
  this.setHeader("Location", url);
  this.end();
};

const required = [
  "dataHolder",
  "set",
  // ====================
  "headersSent",
  "locals",
  "append()",
  "attachment()",
  "cookie()",
  "clearCookie()",
  "download()",
  "format()",
  "get()",
  "json()",
  "jsonp()",
  "links()",
  "location()",
  "send()",
  "sendFile()",
  "sendStatus()",
  "set()",
  "status()",
  "type()",
  "vary()",
  // "redirect()",
  // "jsx",
  // // "render()",
  // // "end()",
];

// const savedData = (res.savedData = {});
// res.save = function ($key, $value) {
//   const key = emptyStr + $key;
//   if (savedData[key] !== undefined) throw errors.savedData;
//   savedData[key] = $value;
// };
