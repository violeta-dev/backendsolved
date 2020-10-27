'use struct';

// Cliente de conversión de moneda
// esta lógica podría ir en un API, por ejemplo

const cote = require('cote');

const requester = new cote.Requester({ name: 'currency client'});

setInterval(() => {
  requester.send({
    type: 'convertir moneda',
    cantidad: 100,
    desde: 'usd',
    hacia: 'eur'
  }, resultado => {
    console.log(`cliente: 100 usd --> ${resultado} eur`, Date.now());
  });
}, 1000);