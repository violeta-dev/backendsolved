var express = require('express');
var router = express.Router();

/* GET /change-locale/:locale */
router.get('/:locale', function(req, res, next) {
  // recuperar el locale que nos pasan
  const locale = req.params.locale;

  // guardar la página de donde venía el usuario
  const volverA = req.get('referer');

  // establecer la cookie en la respuesta con el nuevo locale
  res.cookie('nodeapi-locale', locale, { maxAge: 1000 * 60 * 60 * 24 * 20 });

  // redirigir al usuario a donde venía
  res.redirect(volverA);
});

module.exports = router;
