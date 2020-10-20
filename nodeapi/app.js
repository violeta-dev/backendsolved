var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// conectar a la base de datos
require('./lib/connectMongoose');

// lo probamos
// i18n.setLocale('es');
// console.log(i18n.__('Welcome to'));

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

// Setup de i18n
// Recordar que para que funcione la cookie 'nodeapi-locale' debemos inicilizar
// i18n tras el middleware que lee las cookies
const i18n = require('./lib/i18nConfigure');
app.use(i18n.init); // metemos un middleware a express

/**
 * Rutas del website
 */

const loginController = require('./routes/loginController');

app.use('/',              require('./routes/index'));
app.use('/services',      require('./routes/services'));
app.use('/change-locale', require('./routes/change-locale'));
app.use('/users',         require('./routes/users'));
// en los siguientes usamos la estructura de controladores
app.get('/login',         loginController.index);
app.post('/login',        loginController.post);

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
