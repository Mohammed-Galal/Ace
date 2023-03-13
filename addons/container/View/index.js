const root = function () {}.toString(),
  renderRoot = function () {}.toString();

module.exports = function (title, headTags) {
  const data = this.data.json();

  return [
    "<!DOCTYPE html>",
    "<html lang='en' dir='ltr'>",
    "<head>",
    `
    <meta charset="UTF-8" />
    <meta http-equiv="content-language" content="en-gb" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" / >
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <!-- <link rel="shortcut icon" type="image/x-icon" href="assets/"> -->
    `,
    buildHeadTag(headTags),
    "<title>",
    title,
    "</title>",
    "</head>",
    "<body>",
    hydrateRoot(root, data),
    "<scripts>",
    "(" + renderRoot + ")(" + root + "," + data + ")",
    "</scripts>",
    "</body>",
    "</html>",
  ];
};
