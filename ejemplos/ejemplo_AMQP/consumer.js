'use-strict';

const connectionPromise = require('./connectAMQP');

const queueName = 'tareas';

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




  // cuantos mensajes quiero procesar en paralelo (número de deuda de acks)
  channel.prefetch(1);

  // nos suscribimos a una cola
  channel.consume(queueName, msg => {
    // setTimeout(() => { // simulo que la tarea tarda algún tiempo
      // hago el trabajo que tenga que hacer
      console.log(msg.content.toString());

      // y cuando haya terminado de hacer el trabajo
      channel.ack(msg); // indico a la cola que el mensaje está procesado correctamente

    // }, 1000);
  });

}
