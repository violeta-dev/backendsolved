'use strict';

// modulo que exporta una función
// que crea un middleware y lo devuelve

module.exports = function(options) {
  return function(req, res, next) {

    // si el usuario no está autenticado le mandamos al login
    if (!req.session.authUser) {
      res.redirect('/login');
      return;
    }

    // comprobar roles
    // buscar el usuario en la BD
    // comprobar que tiene al menos los roles de options.roles

    next();

  }
}