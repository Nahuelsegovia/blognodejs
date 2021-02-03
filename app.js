var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var serveStatic = require('serve-static')
let bodyParser = require('body-parser')
const session = require('express-session');

var indexRouter = require('./routes/index');
var servicesRouter = require('./routes/services');

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
app.use(session(
    {secret: 'ssshhhhh',
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: 8*60*60*1000},
}));

app.use(bodyParser.json());
app.use(serveStatic(path.join(__dirname, 'public/markdown/dist')));
app.use(serveStatic(path.join(__dirname, '/node_modules/marked/')));
app.use('/', indexRouter);
app.use('/', servicesRouter);

module.exports = app;
