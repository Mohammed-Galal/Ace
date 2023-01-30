module.exports = function (req, res, route) {
  console.log("root");

  route({
    "/1": () => res.write("first route"),
    "/2": () => res.write("second route"),
  });

  route("api/:id", handler);
};

function handler(req, res, route) {
  // console.log(route);
  console.log(
    route.hostName,
    route.ip,
    route.port,
    route.path,
    route.params,
    route.queryParams
  );

  route("inner", () => console.log("inner"));
}
