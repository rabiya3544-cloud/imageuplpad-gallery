'use strict';
var render = require('../server/render');

module.exports = function (req, res) {
  var query = req.query || {};
  var page = query.page === 'app' ? 'app' : 'unlock';
  var modeLabel =
    query.mode === 'sdk'    ? 'SDK + KV'    :
    query.mode === 'direct' ? 'DIRECT + KV' :
    'DIRECT + KV';

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');

  var html = page === 'app'
    ? render.renderPage({ title: 'ImageUpload · Media Gallery', modeLabel: modeLabel })
    : render.renderUnlockPage({ title: 'ImageUpload · Unlock' });

  res.status(200).send(html);
};
