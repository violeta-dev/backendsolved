'use strict';

const basicAuth = require('basic-auth');

module.exports = function() {
  return (req, res, next) => {
    const user = basicAuth(req);

    // si no tengo credenciales o son erroneas
    if (!user || user.name !== 'admin' || user.pass !== '1234') {
      // poner una cabecera especial en la respuesta
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      res.sendStatus(401);
      return;
    }

    next();
  };
};
