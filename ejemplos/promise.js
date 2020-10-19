'use strict';

// funcion que devuelve una promesa
function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // si falla llamaríamos a reject(err)
      resolve('hola');
      // reject(new Error('fatal!'));
    }, ms);
  });
}

// convertir función (setTimeout) que usa callbacks a promesa (sleep1)
const sleep1 = ms => new Promise(resolve => setTimeout(resolve, ms));

const promesa = sleep(3000);

console.log(promesa);

// cuando se resuelva la promesa hacemos otras cosas
promesa.then((valor) => {
  console.log('resuelta con', valor);
  return sleep(3000);
}).then(() => {
  console.log('resuelta la segunda');
  return sleep(3000);
}).then(() => {
  console.log('resuelta la tercera');
}).catch(err => {
  console.log('ha habido un error al llamar a sleep:', err.message);
});

// ejemplo de promesas en paralelo
Promise.all([sleep(1000), sleep(2000), sleep(3000)])
  .then(() => { // se activa cuando las 3 promesas se cumplen
    console.log('terminaron los 3');
  })