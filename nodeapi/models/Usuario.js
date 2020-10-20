'use strict';

const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
