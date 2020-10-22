'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nodemailerTransport = require('../lib/nodemailerConfigure');

const usuarioSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String
});

usuarioSchema.statics.hashPassword = function(passwordEnClaro) {
  return bcrypt.hash(passwordEnClaro, 10);
}

usuarioSchema.methods.sendMail = function(from, subject, body) {
  // enviar el correo
  return nodemailerTransport.sendMail({
    from: from,
    to: this.email,
    subject: subject,
    html: body
  });
}

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
