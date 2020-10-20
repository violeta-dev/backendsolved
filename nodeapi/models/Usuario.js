'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String
});

usuarioSchema.statics.hashPassword = function(passwordEnClaro) {
  return bcrypt.hash(passwordEnClaro, 10);
}

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
