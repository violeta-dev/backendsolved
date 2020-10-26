'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nodemailerTransport = require('../lib/nodemailerConfigure');
const connectionPromise = require('../lib/connectAMQP');

const queueName = 'tareas';

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

usuarioSchema.methods.enqueueNewEmail = async function(from, subject, body) {
  // conectar al servidor AMQP
  const conn = await connectionPromise;

  // conectar a un canal
  const channel = await conn.createChannel();

  // asegurarnos que tenemos una cola donde publicar
  await channel.assertQueue(queueName, {
    durable: true // la cola sobrevive a reinicios del broker (rabbitMQ)
  });

  const mensaje = {
    from,
    subject,
    body,
    to: this.email
    //...
  };

  // enviar un mensaje a la cola
  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(mensaje)), {
    persistent: true // el mensaje sobrevive a reinicios del broker
  });

  console.log('publicado el mensaje', mensaje);
}

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;
