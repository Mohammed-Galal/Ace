module.exports = function (req, res, route) {
  console.log("root");

  route("api", function () {
    console.log(route.registeredMethods());

    route("inner", () => console.log("inner"));
  });

  console.log(route.matchedRoutes);
};

// function handler(req, res, route) {
//   // res.redirect("/home");
//   console.log("matched");

//   route(["inner/posts/"], () => console.log("inner"));
//   // console.log(res.getCached); // gets all the cached (key, value) pairs
//   // res.save("userData"); // raises an err, Bcause we have alreay defined this key before
// }

/** Notices
 *  the first Arg in the route function must not starts with "/"
 */
