var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express();

// conectar a la base de datos
const mongoConnection = require('./lib/connectMongoose');

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
 * Rutas del API
 */
app.use('/api/agentes', require('./routes/api/agentes'));


/**
 * Rutas del website
 */
const loginController   = require('./routes/loginController');
const privadoController = require('./routes/privadoController');
const sessionAuth = require('./lib/sessionAuth');

/**
 * Inicializamos el sistema de sesiones
 * con el middleware que me deja la sesión del usuario cargada en req.session
 */
app.use(session({
  name: 'nodeapi-session',
  secret: '=&enkwC>-Q%v4&V$=TNex%&',
  saveUninitialized: true,
  resave: false,
  cookie: {
    secure: true, // el browser solo la manda al servidor si usa HTTPS
    maxAge: 1000 * 60 * 60 * 24 * 2 // 2 dias de caducidad por inactividad
  },
  store: new MongoStore({
    mongooseConnection: mongoConnection
  })
}));

// hacer disponible el objeto de sesión en todas las vistas
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
})

app.use('/',              require('./routes/index'));
app.use('/change-locale', require('./routes/change-locale'));
app.use('/users',         require('./routes/users'));
// en los siguientes usamos la estructura de controladores
app.get('/login',         loginController.index);
app.post('/login',        loginController.post);
app.get('/logout',        loginController.logout)
app.use('/services', sessionAuth(),   require('./routes/services'));
app.get('/privado', sessionAuth(),    privadoController.index);
app.get('/admin', sessionAuth({ roles: ['admin'] }), privadoController.index);

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
