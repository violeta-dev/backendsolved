'use strict';

require('dotenv').config();

const amqplib = require('amqplib'); // si lo queremos con callbacks: amqplib/callback_api

const connectionPromise = amqplib.connect(process.env.AMQP_CONNECTION_STRING);

module.exports = connectionPromise;
