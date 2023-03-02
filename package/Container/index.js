const parseURL = require("url").parse,
  MapPolyfill = require("../utils/mapPolyfill"),
  proto = require("./proto"),
  router = require("./router");

module.exports = CONTAINER;

function CONTAINER(req, res) {
  this.req = req;
  this.res = res;
  this.url = parseURL(req.url);
  this.data = new MapPolyfill();
  this.params = {};
  this.matchedRoutes = [];
  this.openRoutes = [];
  this.route = router.bind(this);
}

Object.defineProperties(CONTAINER.prototype, proto);
Object.freeze(CONTAINER.prototype);
