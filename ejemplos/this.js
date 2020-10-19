'use strict';

function Fruta(nombre) {

  this.nombre = nombre;

  this.saluda = function() {
    console.log('Hola soy', this.nombre);
  }

}

const limon = new Fruta('limon');

// limon.saluda();




// const saludador = limon.saluda.bind(limon);
// saludador();

// setTimeout(limon.saluda.bind(limon), 2000);

const pepe = {
  nombre: 'pepe'
};

limon.saluda.call(pepe);
limon.saluda.apply(pepe);
