'use strict';

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// exporto una función que ejecuta el constructor del middleware de sesiones
module.exports = function(mongoConnection) {
  return session({
    name: 'nodeapi-session',
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: {
      secure: true, // el browser solo la manda al servidor si usa HTTPS
      maxAge: 1000 * 60 * 60 * 24 * 2 // 2 dias de caducidad por inactividad
    },
    store: new MongoStore({
      mongooseConnection: mongoConnection
    })
  });
}
