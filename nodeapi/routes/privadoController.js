'use strict';

class PrivadoController {

  /**
   * GET /privado
   */
  index(req, res, next) {
    console.log(req.session.authUser);

    // verificar quien pide la página
    if (!req.session.authUser) {
      res.redirect('/login');
      return;
    }

    res.render('privado');
  }

}

module.exports = new PrivadoController();
