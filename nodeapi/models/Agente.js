'use strict';

const mongoose = require('mongoose');

// crear un esquema (https://mongoosejs.com/docs/schematypes.html)
const agenteSchema = mongoose.Schema({
  name: { type: String, index: true},
  // name: { type: String, index: true}
  age: { type: Number, index: true},
  // phones: [String]
  // message: mongoose.Schema.Types.Mixed // para datos sin schema
},
  {
  //   collection: 'Agente', // para evitar la pluralización
    autoIndex: process.env.NODE_ENV !== 'production', // no crear los índices automáticamente en producción (los crearé yo cuando me convenga)
  }
);

// método estático
agenteSchema.statics.lista = function(filtro, limit, skip, sort, fields) {
  const query = Agente.find(filtro);
  query.limit(limit);
  query.skip(skip);
  query.sort(sort);
  query.select(fields);
  return query.exec();
}

// crear el modelo
const Agente = mongoose.model('Agente', agenteSchema);

// exportar el modelo
module.exports = Agente;
