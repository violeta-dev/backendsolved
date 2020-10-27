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
