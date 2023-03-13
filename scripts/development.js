const http = require("http"),
  path = require("path"),
  rootPath = process.cwd(),
  // targetApp = process.argv.slice(2)[0],
  targetApp = "app",
  webpack = require("webpack");

const config = {},
  modes = ["none", "development", "production"],
  targets = ["node", "web"];

config.mode = modes[1];
config.target = targets[0];
config.entry = {
  index: path.resolve(rootPath, targetApp + "/config.js"),
};

config.output = {
  path: path.resolve(rootPath, targetApp),
  chunkFormat: "commonjs",
  filename(pathData) {
    return pathData.chunk.name === "index" ? "[name].js" : "modules/[name].js";
  },
};

config.resolve = {
  alias: {
    ace: path.resolve(rootPath, "package/index.js"),
    resProto: path.resolve(rootPath, "addons/response"),
    reqProto: path.resolve(rootPath, "addons/request"),
  },
};

config.optimization = {
  chunkIds: "named",
  splitChunks: {
    chunks: "all",
    cacheGroups: {
      module: {
        test: /[\\/]node_modules[\\/]/,
      },
    },
  },
};

try {
  const compiler = webpack(config),
    watchOptions = {
      ignored: /node_modules/,
    };

  compiler.watch(watchOptions, webpackCallback);
  // .run();
} catch {
  console.log(config);
}

function webpackCallback() {
  // console.log(arguments);
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
