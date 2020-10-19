'use strict';

// cargar express y http
const express = require('express');
const http = require('http');

const app = express();

// definir rutas
app.get('/', (request, response, next) => {
  response.send('hola');
});

app.get('/admin', (request, response, next) => {
  response.send('zona de administración');
});

// arrancar el servidor
const server = http.Server(app);
server.listen(3000, () => {
  console.log('listening on port 3000');
});