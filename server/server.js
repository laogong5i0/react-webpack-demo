var express = require('express');
var webpack = require('webpack');
var config = require('../webpack/webpack.dev.config.js');
var app = express();
var compiler = webpack(config);


var isDev = process.env.NODE_ENV === 'development';
if (isDev) {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

require('./config/express')(app);
require('./config/routes')(app);

app.listen(app.get('port'))
