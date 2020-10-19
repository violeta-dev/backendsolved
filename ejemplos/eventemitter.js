'use strict';

const EventEmitter = require('events');

// creo una instancia de emisor de eventos

const emisor = new EventEmitter();

emisor.on('llamada de telefono', (options) => {
  if (options.llamante === 'madre') {
    return;
  }
  console.log('ring ring');
});

emisor.once('llamada de telefono', (options) => {
  console.log('brr brr');
});


emisor.emit('llamada de telefono', { llamante: 'madre' });
