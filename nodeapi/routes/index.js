var express = require('express');
var router = express.Router();
var createError = require('http-errors');
const { query, validationResult } = require('express-validator');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.locals.title = 'Express';

  const segundo = (new Date()).getSeconds(); // segundo actual

  res.locals.valor = '<script>alert("' + res.__('code injection') + '");</script>';

  res.locals.condicion = {
    segundo: segundo,
    estado: segundo % 2 === 0
  };

  res.locals.users = [
    { name: 'Smith', age: 39 },
    { name: 'Jones', age: 22 },
    { name: 'Brown', age: 42 },
  ];

  res.render('index'); //, { title: 'Express' });
});

router.get('/paramenruta/:etiqueta', (req, res, next) => {
  console.log(req.params);
  res.send('ok');
});

router.get('/paramenrutaopcional/:numero?', (req, res, next) => {
  console.log(req.params);
  res.send('ok al opcional');
});

// http://localhost:3000/parametros/22/piso/2/puerta/C
router.get('/parametros/:id([0-9]+)/piso/:piso/puerta/:puerta', (req, res, next) => {
  console.log(req.params);
  res.send('ok');
});

// recibir parametros en query string
router.get('/enquerystring',
  [ // validaciones
    query('color').isAlpha().withMessage('debería ser texto'),
    query('talla').isNumeric().withMessage('debe ser numérico'),
  ],
  (req, res, next) => {
  validationResult(req).throw(); // lanzar exception si hay errores de validación
  console.log(req.query);
  res.send('ok');
});

// recibir parametros en el body
router.post('/enelbody', (req, res, next) => {
  console.log(req.body);
  if (req.body.color !== 'rojo') {
    next(createError(422, 'color no adminitido (solo funciona con el rojo)'));
    return;
  }
  res.send('ok');
});

module.exports = router;
