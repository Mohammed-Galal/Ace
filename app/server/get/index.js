// res.writeHead(200, {
//   "content-type": "text/html",
//   "access-control-allow-credentials": true,
//   "access-control-allow-origin": "*",
//   "access-control-allow-methods": "GET, POST",
//   "access-control-allow-headers":
//     "X-Requested-With,content-type, Authorization",
// });

module.exports = function (app) {
  const { req, res, url, route } = app;

  if (url.isFilePath) return res.sendFile(url.path.name);
  // if (url.isFilePath) {
  //   return res.sendFile(url.path.name);
  // }

  route("/", () => {
    res.write("root ijfoie");
  });

  route({
    "/1": () => res.write("first route"),
    "/2": () => res.write("second route"),
  });

  route("api/:id", handler);
  if (!res.writableEnded) res.end();
};

function handler({ route }) {
  route("inner", ({ res }) => res.write("inner"));
}
