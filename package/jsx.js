const { Num, isArray, isNaN, emptyStr } = require("./constants");

module.exports = new (function JSX() {
  const jsxDoc = [];
  this.jsxDoc = function () {
    return jsxDoc.join("");
  };

  let currentContainer = null;
  this.hold = function (container) {
    const dom = container.dom,
      prevContainer = currentContainer;
    currentContainer = container;
    jsxDoc.push(createNode(dom));
    currentContainer = prevContainer;
  };

  function createNode(node) {
    if (isArray(node)) {
      const tag = isNaN(node[0])
          ? node[0]
          : _JSX.hold(currentContainer.component[node[0]]),
        attrs = evalStr(node[1]);
      if (node.length === 2) return "<" + tag + " " + attrs + " />";
      const children = node[2].map(createNode).join(emptyStr);
      return "<" + tag + " " + attrs + ">" + children + "</" + tag + ">";
    }

    return evalStr(node);
  }

  function evalStr(str) {
    const arr = str.split(/\{|\}/g);
    return arr.length > 1 ? arr.map(getScript).join("") : str;
  }

  function getScript(val) {
    const N = Num(val);
    if (isNaN(N)) return val;
    return currentContainer.scripts[N];
  }
})();
