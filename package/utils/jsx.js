const mostImportantTags4SEO = [
  "style",
  "div",
  "span",
  "header",
  "footer",
  "main",
  "section",
  "article",
  "aside",
  "details",
  "dialog",
  "summary",
  "data",
  "table",
  "caption",
  "th",
  "tr",
  "td",
  "thead",
  "tbody",
  "tfoot",
  "col",
  "colgroup",
  "ul",
  "ol",
  "li",
  "dl",
  "dt",
  "dd",
  "a",
  "link",
  "nav",
];

const vision = [
  {
    route: null,
    tempPath: "/nav",
  },
];

function Container(context) {
  this.components = context.components;
  this.scripts = context.scripts;
  this.resolveDom(context.dom);
}

const proto = Container.prototype;

proto.handleElement = function (dom) {};

const { Num, isArray, isNaN, emptyStr } = require("../constants");

module.exports = new (function JSX() {
  const jsxDoc = [];
  let currentContainer = null;

  this.jsxDoc = function () {
    return jsxDoc.join("");
  };

  this.hold = function () {
    return jsxDoc.push(resolveContainer(container));
  };

  function resolveContainer(container) {
    const dom = container.dom,
      prevContainer = currentContainer;
    currentContainer = container;
    const result = createNode(dom);
    currentContainer = prevContainer;
    result;
  }

  function createNode(node) {
    if (isArray(node)) {
      const tag = isNaN(node[0])
          ? node[0]
          : resolveContainer(currentContainer.component[node[0]]),
        attrs = evalStr(node[1]);
      return (
        "<" +
        tag +
        " " +
        attrs +
        (node.length > 2
          ? ">" + node[2].map(createNode).join(emptyStr) + "</" + tag
          : "/") +
        ">"
      );
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
