'use strict';

const express = require('express');
const app = express();
const server = require('http').Server(app);
const path = require('path');

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// arrancamos el servidor
server.listen(3000, () => {
  console.log('Listening on port 3000');
});

const io = require('socket.io')(server);

// ante cada conexión de un cliente...
io.on('connection', socket => {
  // socket es una conexión con un browser
  console.log('nueva conexión de un cliente!', socket.id);

  // recibimos eventos 'nuevo-mensaje'
  socket.on('nuevo-mensaje', data => {
    console.log('recibido:', data);

    // enviamos el mensaje recibido de un cliente
    // al resto de clientes
    io.emit('mensaje-chat', data);

  });

  setInterval(() => {
    socket.emit('pasa-un-segundo');
  }, 1000);

})