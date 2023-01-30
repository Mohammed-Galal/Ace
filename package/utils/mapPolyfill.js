module.exports = Map;

const proto = Map.prototype;
function Map() {}

proto.set = function (key, val) {
  this[key] =
    (val !== undefined && val.constructor.name) === "Function"
      ? val(this[key])
      : val;
  return this[key];
};

proto.get = function (key) {
  return this[key];
};

proto.delete = function (key) {
  delete this[key];
};

proto.has = function (key) {
  return this[key] !== undefined;
};

proto.forEach = function (fn) {
  this.keys.forEach(fn, this);
};

proto.clear = function () {
  const that = this;
  this.forEach(function (prop) {
    delete that[prop];
  });
};

Object.defineProperties(proto, {
  key: {
    enumerable: true,
    get() {
      return Object.keys(this);
    },
  },

  length: {
    enumerable: true,
    get() {
      return this.keys.length;
    },
  },
});

const test = new Map();

test.set("i", 1);
test.set("i", (s) => s + 1);
test.set("i", (s) => s + 1);
test.set("i", (s) => s + 1);
test.set("i", (s) => s + 1);

console.log(test);
