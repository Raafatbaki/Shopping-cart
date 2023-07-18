var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { error } = require('console');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js')));

mongoose.connect('mongodb://127.0.0.1:27017/Shopping-cart', {useNewUrlParser: true})
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((error) => {
    console.log(error);
  });

  // mongoose.connect('mongodb://127.0.0.1:27017/Shopping-cart', {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // })
  //   .then(() => {
  //     console.log('Connected to MongoDB');
  //     // استمر في تنفيذ الخطوات الأخرى بعد الاتصال بنجاح
  //   })
  //   .catch((error) => {
  //     console.error('Failed to connect to MongoDB:', error);
  //   });

  // mongoose.connect('mongodb://127.0.0.1:27017', { useNewUrlParser: true })
  // .then(() => {
  //   // إنشاء قاعدة البيانات "Shopping-cart"
  //   return mongoose.connection.db.createDatabase('Shopping-cart');
  // })
  // .then(() => {
  //   console.log('#');
  //   // استمر في تنفيذ الخطوات الأخرى بعد إنشاء قاعدة البيانات
  // })
  // .catch((error) => {
  //   console.log('f', error);
  // });

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
