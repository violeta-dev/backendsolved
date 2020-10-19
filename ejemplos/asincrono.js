'use strict';

console.log('empiezo');

function escribeTras2Segundos(texto, callback) {
  setTimeout(() => {
    console.log(texto);
    callback(); // aquí se ejecuta la función anonima
  }, 2000);
}

escribeTras2Segundos('texto1', () => {
  escribeTras2Segundos('texto2', () => {
    console.log('termino');
  });
});

