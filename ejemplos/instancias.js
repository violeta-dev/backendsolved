'use strict';

// crear una función para usarla como constructor de objetos
function Fruta(nombre) {

  // this es el objeto que estamos creando
  this.nombre = nombre;

  this.getNombre = function() {
    return this.nombre;
  }

  // al utilizar esta función con "new" devolverá this
}

const limon = new Fruta('limon');

console.log(limon.getNombre());
