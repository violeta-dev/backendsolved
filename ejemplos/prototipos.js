'use strict';

// definimos una función constructora de objetos
function Persona(nombre) {
  this.nombre = nombre;
}

// crear un objeto
const luis = new Persona('Luis');

// añadir propiedades al prototipo de las personas
Persona.prototype.saluda = function() {
  console.log('Hola, me llamo', this.nombre);
}

luis.saluda();

// Herencia de persona -------------------------------------------------

// función constructora de Agentes
function Agente(nombre) {
  // heredar el constructor de personas
  Persona.call(this, nombre);
}

// heredar sus propiedades y métodos
Agente.prototype = Object.create(Persona.prototype);
Agente.prototype.constructor = Agente;

const smith = new Agente('Smith');

smith.saluda();

// console.log(smith instanceof Agente);
// console.log(smith instanceof Persona);
// console.log(smith instanceof Object);

// Herencia múltiple

// Mixin Superheroe
function Superheroe() {
  this.vuela = function() {
    console.log(this.nombre, 'vuela');
  }
}

// copiar todas las propiedades de Superheroe al prototipo de Agente
Object.assign(Agente.prototype, new Superheroe());

smith.vuela();
