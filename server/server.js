// Babel ES6/JSX Compiler
require('babel-register');

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mongoose = require('mongoose');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var swig  = require('swig');

var config = require('./config');
var routes = require('../app/routes');

var app = express();

mongoose.connect(config.database);
mongoose.connection.on('error', function() {/* istanbul ignore next */
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?'.red);/* istanbul ignore next */
});/* istanbul ignore next */

app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', require('./api'));

app.use(function(req, res) {/* istanbul ignore next */
  Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {/* istanbul ignore next */
    if (err) {/* istanbul ignore next */
      res.status(500).send(err.message)/* istanbul ignore next */
    } else if (redirectLocation) {/* istanbul ignore next */
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)/* istanbul ignore next */
    } else if (renderProps) {/* istanbul ignore next */
        var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));/* istanbul ignore next */
        var page = swig.renderFile('views/index.html', { html: html });/* istanbul ignore next */
        res.status(200).send(page);/* istanbul ignore next */
    } else {/* istanbul ignore next */
      res.status(404).send('Page Not Found')/* istanbul ignore next */
    }/* istanbul ignore next */
  });/* istanbul ignore next */
});/* istanbul ignore next */

app.use(function (err, req, res, next) {/* istanbul ignore next */
  console.log(err.stack.red);/* istanbul ignore next */
  res.status(err.status || 500);/* istanbul ignore next */
  res.send({ message: err.message });/* istanbul ignore next */
});/* istanbul ignore next */


app.listen(app.get('port'), function() {/* istanbul ignore next */
  console.log('Express server listening on port ' + app.get('port'));/* istanbul ignore next */
});/* istanbul ignore next */

module.exports = app;
