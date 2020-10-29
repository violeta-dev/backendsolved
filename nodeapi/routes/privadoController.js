'use strict';

const Usuario = require('../models/Usuario');

class PrivadoController {

  /**
   * GET /privado
   */
  async index(req, res, next) {
    try {
      const usuario = await Usuario.findOne({_id: req.session.authUser._id});
      if (!usuario) {
        return next(new Error('usuario registrado pero no encontrado'));
      }


      res.render('privado', { usuario });

    } catch(err) {
      return next(err);
    }
  }

}

module.exports = new PrivadoController();
