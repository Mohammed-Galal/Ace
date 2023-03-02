const { resProto: res } = require("./constants.js");

res.redirect = function (url) {
  this.statusCode = 302;
  this.setHeader("Location", url);
  this.end();
};

const required = [
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
  "status()",
  "type()",
  "vary()",

  // // "set",
  // // "set()",
  // "dataHolder",
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
