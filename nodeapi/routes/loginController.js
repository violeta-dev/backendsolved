'use strict';

const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

class LoginController {

  /**
   * GET /login
   */
  index(req, res, next) {
    res.locals.error = '';
    res.locals.email = '';
    res.render('login');
  }

  /**
   * POST /login
   */
  async post(req, res, next) {
    try {

      // recoger valores de entrada
      const email = req.body.email;
      const password = req.body.password;

      // buscar el usuario en la BD
      const usuario = await Usuario.findOne({ email: email });

      // si no existe el usuario o la password no coincide
      // mostrar un error
      if (!usuario || !(await bcrypt.compare(password, usuario.password )) ) {
        res.locals.error = res.__('Invalid credentials');
        res.locals.email = email;
        res.render('login');
        return;
      }

      // si el usuario existe y la password es correcta

      // apuntar el _id del usuario en su sessión
      req.session.authUser = {
        _id: usuario._id,
        // rol: ...
      };

      // enviar email
      // expresamente no ponemos await para no esperar a que se mande el email antes de redirigir
      // usuario.sendMail(process.env.ADMIN_EMAIL, 'Bienvenido a NodeApi', `Hola <%= nombre %>`);

      // redirigir a zona privada
      res.redirect('/privado');

    } catch (err) {
      next(err);
    }
  }

  /**
   * GET /logout
   */
  logout(req, res, next) {
    req.session.regenerate(err => {
      if (err) {
        next(err);
        return;
      }
      // redirigir a la home
      res.redirect('/');
    })
  }

}

module.exports = new LoginController();
