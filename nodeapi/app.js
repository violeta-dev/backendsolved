var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// conectar a la base de datos
require('./lib/connectMongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

// establecemos la variable title para todas las vistas
app.locals.title = 'Express';

// Ante cada petición se ejecutan los siguientes middlewares
app.use(function(req, res, next) {
  // console.log('soy un middleware');
  // en un middleware siempre hay que hacer una de 2:
  //   - Responder
  //   - Llamar a next()
  // res.send('hola');
  next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Rutas del website
 */
app.use('/',      require('./routes/index'));
app.use('/users', require('./routes/users'));

/**
 * Rutas del API
 */
app.use('/api/agentes', require('./routes/api/agentes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  // console.log(err);
  if (err.array) { // error de validación
    err.status = 422;
    const errInfo = err.array({ onlyFirstError: true})[0];
    err.message = `El parámetro ${errInfo.param} ${errInfo.msg}`;
  }

  res.status(err.status || 500);

  if (req.originalUrl.startsWith('/api/')) { // API request
    res.json({ error: err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

module.exports = app;
