'use strict';

// Servicio de cambio de moneda

const cote = require('cote');

// declarar el micro-servicio
const responder = new cote.Responder({ name: 'currecy responder'});

// tabla de conversión (BD propia del micro-servicio)
const rates = {
  usd_eur: 0.92,
  eur_usd: 1.08
};

// lógica del micro-servicio
responder.on('convertir moneda', (req, done) => {
  console.log('servicio:', req.desde, req.hacia, req.cantidad, Date.now());

  // calcular el resultado (desde: usd, hacia: eur --> usd_eur)
  const resultado = rates[req.desde + '_' + req.hacia] * req.cantidad;

  done(resultado);

});