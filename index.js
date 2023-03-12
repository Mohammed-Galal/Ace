const path = require("path"),
  rootPath = process.cwd(),
  // targetApp = process.argv.slice(2)[0],
  targetApp = "app",
  webpack = require("webpack");

const config = {},
  targets = ["node", "web"];

config.target = targets[0];
config.entry = path.resolve(rootPath, targetApp + "/config.js");
config.output = {
  path: path.resolve(rootPath, targetApp),
  filename: "index.js",
  chunkFormat: "commonjs",
};

config.resolve = {
  alias: {
    ace: path.resolve(rootPath, "package/index.js"),
    resProto: path.resolve(rootPath, "addons/response"),
    reqProto: path.resolve(rootPath, "addons/request"),
  },
};

try {
  webpack(config).run();
} catch {
  console.log(config);
}

/**
config.plugins =
[
  new webpack.ProvidePlugin({
    //global var named serve
    serve: path.resolve(path.join(__dirname, "server")),
    }),
  ];

  */
