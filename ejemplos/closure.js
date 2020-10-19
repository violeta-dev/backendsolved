'use strict';

function creaSumador(a) {
  // aqui tenemos el argumento a con un 5
  // y este contexto es capturado por la función que creamos y retornamos
  return function (b) {
    return b + a;
  }
}

const suma5 = creaSumador(5);

console.log(suma5(3), suma5(7));

// -----------------

// crear un factory de objetos

function creaAgente(nombre) {
  return {
    getNombre: function() {
      return nombre;
    },
    setNombre: function(valor) {
      nombre = valor;
    },
    saluda: function() {
      console.log('Hola soy', nombre);
    }
  }
}

const jones = creaAgente('Jones');

jones.saluda();

setTimeout(jones.saluda, 2000);
