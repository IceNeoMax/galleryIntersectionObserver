const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const config = require('./webpack/webpack.dev.js');
const compiler = webpack(config);

function createWebpackMiddleware(compiler, publicPath) {
    return webpackDevMiddleware(compiler, {
      logLevel: 'warn',
      publicPath,
      silent: true,
      stats: 'errors-only',
    });
}
// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
const middleware = createWebpackMiddleware(
    compiler,
    config.output.publicPath,
);
app.use(middleware);
app.use(webpackHotMiddleware(compiler));
// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Nguyendz is on the move!');
});
