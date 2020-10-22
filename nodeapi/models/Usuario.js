'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const usuarioSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String
});

usuarioSchema.statics.hashPassword = function(passwordEnClaro) {
  return bcrypt.hash(passwordEnClaro, 10);
}

usuarioSchema.methods.sendMail = function(from, subject, body) {
  // crear un transport
  const transport = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_SERVICE_USER,
      pass: process.env.EMAIL_SERVICE_PASS
    }
  });

  // enviar el correo
  return transport.sendMail({
    from: from,
    to: this.email,
    subject: subject,
    html: body
  });
}

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
