var express = require('express');
var http = require('http');
var path = require('path');

var timer = require('./app/controllers/timer');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.use('/', timer.index);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(process.env.PORT || '3000', function () {
  console.log('Server listening on port 3000!');
});
