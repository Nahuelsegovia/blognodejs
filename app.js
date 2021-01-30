var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let bodyParser = require('body-parser')

var indexRouter = require('./routes/index');

var app = express();

/* VIEWS CONFIG */

var mustacheExpress = require('mustache-express');
 
// Register '.mustache' extension with The Mustache Express
app.engine('html', mustacheExpress());
 
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.use('/', indexRouter);

module.exports = app;
