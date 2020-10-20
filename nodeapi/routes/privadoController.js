'use strict';

class PrivadoController {

  /**
   * GET /privado
   */
  index(req, res, next) {
    res.render('privado');
  }

}

module.exports = new PrivadoController();
