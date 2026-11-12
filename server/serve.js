'use strict';
var express = require('express');
var path = require('path');
var renderPage = require('./render').renderPage;

var app = express();
var PORT = process.env.PORT || 3000;

/* Serve static assets (app.js, upload-*.js, imageupload-sdk.js, style.css) */
app.use(express.static(path.resolve(__dirname, '..')));

/* Render the HTML on every request */
app.get('/', function (req, res) {
  var modeLabel =
    req.query.mode === 'sdk'    ? 'SDK + KV'    :
    req.query.mode === 'direct' ? 'DIRECT + KV' :
    'DIRECT + KV';                              // default matches app.js's getActiveMode()

  res.type('html').send(renderPage({
    title: 'ImageUpload · Media Gallery',
    modeLabel: modeLabel
  }));
});

app.listen(PORT, function () {
  console.log('http://localhost:' + PORT);
});
