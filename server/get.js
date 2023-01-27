module.exports = function (req, res, route) {
  // res.save("userData", {}); // doesnt accept function as an argument[1]
  console.log("root");
  // const result = matched ? routeData : null;
  route("/api", handler);
};

// server/get/handler.js
function handler(req, res, route) {
  res.redirect("/home");
  // console.log("matched");

  // route(["/inner/posts/"], () => console.log("inner"));
  // console.log(res.getCached); // gets all the cached (key, value) pairs
  // res.save("userData"); // raises an err, Bcause we have alreay defined this key before
}

/** route("path", handler)
 * @param {String} path
 * ? add $ at the end of the path (to be exact) Path
 * @param {!Function} handler
 * @returns {Boolean} isMatched?
 */

/** res.store("key", value)
 * @param {String}
 * ? the key of the cached value && if the key is already existed, we raise an error
 * @param {!Function}
 * ? the value to be cahced
 * @returns {Undefined}
 */

/** res.getCached
 * ? getter function
 */
