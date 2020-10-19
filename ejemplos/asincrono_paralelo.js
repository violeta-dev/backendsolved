'use strict';

console.log('empiezo');

function escribeTras2Segundos(texto, callback) {
  setTimeout(() => {
    console.log(texto);
    callback(); // aquí se ejecuta la función anonima
  }, 2000);
}

function serie(n, fnAEjecutar, callbackFinalizacion) {
  if (n == 0) {
    callbackFinalizacion();
    return;
  }
  n = n - 1;
  fnAEjecutar('texto' + n, () => {
    serie(n ,fnAEjecutar, callbackFinalizacion);
  })
}

serie(5, escribeTras2Segundos, () => {
  console.log('terminado');
});
