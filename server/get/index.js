const fs = require("fs"),
  path = require("path"),
  rootPath = "../../",
  resolvePath = path.resolve,
  getMimeType = require("mime-types").lookup;

module.exports = function ({ res, route, port }) {
  route("/", () => {
    res.write("root");
  });

  console.log(port);

  // if (route.isFilePath) {
  //   const filePath = resolvePath(rootPath + "/assets/" + route.path),
  //     mime = getMimeType(path);
  //   res.setHeader("Content-type", mime);
  //   if (fs.existsSync(filePath)) {
  //     res.statusCode = 200;
  //     res.write(fs.readFileSync(filePath));
  //   } else res.statusCode = 404;
  // }

  // res.writeHead(200, {
  //   "content-type": "text/html",
  //   "access-control-allow-credentials": true,
  //   "access-control-allow-origin": "*",
  //   "access-control-allow-methods": "GET, POST",
  //   "access-control-allow-headers":
  //     "X-Requested-With,content-type, Authorization",
  // });

  route({
    "/1": () => res.write("first route"),
    "/2": () => res.write("second route"),
  });

  // route("api/:id", handler);
  if (!res.writableEnded) res.end();
};

function handler({ route }) {
  // console.log(app);
  // console.log(
  // route.hostName,
  // route.ip,
  // route.port,
  // route.path,
  // route.params,
  // route.queryParams
  // );
  route("inner", ({ res }) => res.write("inner"));
}
