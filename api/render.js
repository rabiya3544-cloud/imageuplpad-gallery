'use strict';
var renderPage = require('../server/render').renderPage;

module.exports = function (req, res) {
  var query = req.query || {};
  var modeLabel =
    query.mode === 'sdk'    ? 'SDK + KV'    :
    query.mode === 'direct' ? 'DIRECT + KV' :
    'DIRECT + KV';

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).send(renderPage({
    title: 'ImageUpload · Media Gallery',
    modeLabel: modeLabel
  }));
};
