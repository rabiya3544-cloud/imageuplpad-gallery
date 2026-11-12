'use strict';
var renderPage = require('../server/render').renderPage;

module.exports = function (req, res) {
  var query = req.query || {};
  var modeLabel = /* … */;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(renderPage({ title: '…', modeLabel: modeLabel }));
};
