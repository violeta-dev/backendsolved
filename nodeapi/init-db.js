'use strict';

require('dotenv').config();

const readline = require('readline');
const conn = require('./lib/connectMongoose');
const Agente = require('./models/Agente');
const i18n = require('./lib/i18nConfigure');

conn.once('open', async () => {
  try {

    const respuesta = await askUser(i18n.__('Are you sure you want to initialize the database? (no)'));

    if (respuesta.toLowerCase() !== 'si') {
      console.log('Proceso abortado.');
      return process.exit(0);
    }

    await initAgentes();
    // await initUsuarios();
    // ...

    // cerrar la conexión
    conn.close();

  } catch (err) {
    console.log('Hubo un error:', err);
    process.exit(1);
  }

});

async function initAgentes() {
  // borrar documentos existentes de la colección
  console.log('Vaciando colección de agentes...');
  await Agente.deleteMany();

  // cargar los documentos iniciales
  console.log('Cargando agentes...');
  const result = await Agente.insertMany([
    { name: 'Smith', age: 36 },
    { name: 'Brown', age: 19 }
  ]);
  console.log(`Se han creado ${result.length} agentes.`);
}

function askUser(textoPregunta) {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(textoPregunta, answer => {
      rl.close();
      resolve(answer);
    });
  });
}