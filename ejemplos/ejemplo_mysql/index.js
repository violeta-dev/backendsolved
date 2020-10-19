'use strict';

// cargar driver
const mysql = require('mysql');

// crear una conexión
const conexion = mysql.createConnection({
  host: 'didimo.es',
  user: 'usuariocurso',
  password: 'us3r',
  database: 'cursonode'
});

// conectar al servidor
conexion.connect(err => {
  if (err) {
    console.log('Error al conectar', err);
    return;
  }
  console.log('Conectado a Mysql');

  // lanzar una consulta
  conexion.query('SELECT * FROM agentes', (err, rows, fields) => {
    if (err) {
      console.log('Error en la consulta');
      return;
    }

    console.log(rows);

    // cerrar la conexión
    conexion.end();

  });

});

// Con un ORM: Agente.find({ age: 30}); // select * from agentes where age = 30;