const { extentionExp, objFromEntries, SP } = require("../constants"),
  enumerable = true;

module.exports = {
  path: {
    enumerable,
    get() {
      return this.url.pathname;
    },
  },
  queryParams: {
    enumerable,
    get() {
      return objFromEntries(new SP(this.url.query));
    },
  },
  port: {
    enumerable,
    get() {
      return this.url.port;
    },
  },
  hostName: {
    enumerable,
    get() {
      return this.url.hostname;
    },
  },
  ip: {
    enumerable,
    get() {
      return this.req.headers["x-forwarded-for"];
    },
  },
  subdomains: {
    enumerable,
    get() {
      return this.req.headers.host.split(".").slice(0, -1);
    },
  },
  hash: {
    enumerable,
    get() {
      return this.url.hash;
    },
  },
  isFilePath: {
    enumerable,
    get() {
      return extentionExp.test(this.url.pathname);
    },
  },
};
