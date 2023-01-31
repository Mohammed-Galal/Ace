module.exports = Store;

function Store() {}
const proto = Store.prototype;

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

proto.json = function () {
  return JSON.stringify(this);
};

Object.defineProperties(proto, {
  keys: {
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
