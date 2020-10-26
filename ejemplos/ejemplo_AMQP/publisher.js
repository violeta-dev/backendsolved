'use-strict';

const connectionPromise = require('./connectAMQP');

const queueName = 'tareas';
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

main().catch(err => console.log('Hubo un error:', err));

async function main() {

  // conectar al servidor AMQP
  const conn = await connectionPromise;

  // conectar a un canal
  const channel = await conn.createChannel();

  // asegurarnos que tenemos una cola donde publicar
  await channel.assertQueue(queueName, {
    durable: true // la cola sobrevive a reinicios del broker (rabbitMQ)
  });

  let sendAgain = true;
  while(true) {

    const mensaje = {
      texto: 'tarea para hacer numero:' + Date.now(),
      to: 'asdsadsa@example.com',
      //...
    }

    if (!sendAgain) {
      console.log('*** Cola llena. Esperando al evento Drain...');
      await new Promise(resolve => channel.on('drain', resolve)); // promesa que se resuelve cuando salte el evento 'drain'
    }

    // enviar un mensaje a la cola
    sendAgain = channel.sendToQueue(queueName, Buffer.from(JSON.stringify(mensaje)), {
      persistent: true // el mensaje sobrevive a reinicios del broker
    });

    console.log('publicado el mensaje', mensaje.texto);
    await sleep(100);

  }

}