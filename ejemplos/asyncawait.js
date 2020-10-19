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

async function main() {
  const resultado = await sleep(1000);
  console.log(resultado);

  const resultado2 = await sleep(1000);
  console.log(resultado2);
}

main().catch(err => {
  console.log('Hubo un error:', err);
});