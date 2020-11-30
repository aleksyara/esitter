var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var methodOverride = require('method-override');
var logger = require('morgan');

// load the env vars
require('dotenv').config();

var app = express();
// connect to the MongoDB with mongoose
require('./config/database');
// configure Passport
require('./config/passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var classessRouter = require('./routes/classes');
var reviewsRouter = require('./routes/reviews');
const { allowedNodeEnvironmentFlags } = require('process');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// mount the session middleware
app.use(session({
  secret: 'SEI Rocks!',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize()); //the way you do it. From the docs
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/classes', classessRouter);
app.use('/', reviewsRouter);


//to make sure req.user is accessible in every view
app.use(function(req, res, next){
  //attached to locaals is what the property/variavle that will be available trough our app
  res.locals.user = req.user;//if we are mot looged in req.user will be undefined. res.locals gives by Express
  // app.set('user', {email: 'asdfasdfasf'});
  next();
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
