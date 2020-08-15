var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');
​
var app = express();

app.options('*',cors())

app.use(bodyParser.json());
​
// Conectar con una Base de Datos
var con = mysql.createConnection({
  host: "104.155.161.18",
  user: "root",
  password: "uade",
  database: "grupo8"
});
​
con.connect(function (err) {
  if (err) throw err;
​
  app.listen(3005, function(err) {
    if (err) throw err;
​
    console.log("Programa escuchando en puerto 3005");
  });
});
​
//////////////////////////////
///////// usuario /////////
//////////////////////////////
​
// Crear Usuario
app.post('/crearUsuario', function(req, res) {
    var usuario = req.body;
  if (!usuario.nombre || !usuario.apellido || !usuario.mail || !usuario.password) {
    return res.send("El nombre, apellido, el mail y la password del usuario no pueden quedar vacios");
  }
​
  var usuarioArray = [
    usuario.nombre,
    usuario.apellido,
    usuario.mail,
    usuario.password
  ];
​
  con.query("INSERT INTO user (first_name, last_name, email, password) VALUES (?, ?, ?, ?) ", usuarioArray, function(err, result) {
    if (err) throw err;
​
    res.send("Se ha creado el usuario: " + result.insertId);
  });
});
​
// Crear wallet
app.post('/crearWallet', function(req, res) {
    var billetera = req.body;
  if (!billetera.nombre || !billetera.tipo) {
    return res.send("El nombre y el tipo de la billetera no pueden quedar vacios");
  }
​
  var billeteraArray = [
    billetera.nombre,
    billetera.tipo,
    billetera.balance    
];
​
  con.query("INSERT INTO wallet (name, type, balance) VALUES (?, ?, ?) ", billeteraArray, function(err, result) {
    if (err) throw err;
​
    res.send("Se ha creado la billetera: " + result.insertId);
  });
});

// Movimiento gasto

app.post('/movimientoGasto', function(req, res) {
    var movimiento = req.body;
  if (!movimiento.descripcion || !movimiento.valor|| !movimiento.fecha || !movimiento.tipoMovimiento) {
    return res.send("La descripcion, el valor, fecha y el tipo de movimiento no pueden quedar vacios");
  }
​
  var movimientoArray = [
    movimiento.descripcion,
    movimiento.valor,
    movimiento.fecha,
    movimiento.categoria,
    movimiento.tipoMovimiento    
];
​  //Enviar el id del usuario al momento de generar el gasto con.query("Select id_wallet, id_user from user_wallet where id_user=''");
  con.query("INSERT INTO income_expenses (description, value, date, category, type) VALUES (?, ?, ?, ?, ?) ", movimientoArray, function(err, result) {
    if (err) throw err;
​
    res.send("Se ha creado: " + result.insertId);
  });
});
​
// Modificar Estudiante
app.put('/estudiante/:idEstudiante', function(req, res) {
  var estudiante = req.body;
  var idEstudiante = parseInt(req.params.idEstudiante);
  if (isNaN(idEstudiante)) {
    return response.send("Debe ingresar un id de estudiante válido como parámetro.");
  }
​
  if (!estudiante.nombre || !estudiante.apellido) {
    return res.send("El nombre y apellido del usuario no puede ser vacio");
  }
​
  var estudianteArray = [
    estudiante.nombre,
    estudiante.apellido,
    estudiante.direccion,
    estudiante.telefono,
    idEstudiante
  ];
​
  con.query(`UPDATE estudiantes
    SET nombre = ?, apellido = ?, direccion = ?, telefono = ?
    WHERE id_estudiante = ?`, estudianteArray, function(err, result) {
    if (err) throw err;
    if (result.affectedRow == 0) {
      res.send("No se ha modificado ningún usuario");
    }
​
    res.send("Se ha modificado el usuario: " + idEstudiante);
  });
});
​
// Eliminar Estudiante
app.delete('/estudiante/:idEstudiante', function(req, res) {
  var idEstudiante = parseInt(req.params.idEstudiante);
  if (isNaN(idEstudiante)) {
    return response.send("Debe ingresar un id de estudiante válido como parámetro.");
  }
​
  con.query(`DELETE FROM estudiantes WHERE id_estudiante = ?`, [idEstudiante], function(err, result) {
    if (err) throw err;
​
    res.send("Se ha eliminado el estudiante: " + idEstudiante);
  });
});
​
​
//////////////////////////////
///////// materias////////////
//////////////////////////////
​
// Crear Materia
app.post('/materia', function(req, res) {
  var materia = req.body;
  if (!materia.codigo || !materia.nombre) {
    return res.send("El nombre y código de la materia no puede ser vacio");
  }
​
  var materiaArray = [
    materia.codigo,
    materia.nombre
  ];
​
  con.query("INSERT INTO materias (codigo_materia, nombre) VALUES (?, ?) ", materiaArray, function(err, result) {
    if (err) throw err;
​
    res.send("Se ha creado la materia: " + result.insertId);
  });
});
​
// Eliminar Materia
app.delete('/materia/:idMateria', function(req, res) {
  var idMateria = parseInt(req.params.idMateria);
  if (isNaN(idMateria)) {
    return response.send("Debe ingresar un id de materia válido como parámetro.");
  }
​
  con.query(`DELETE FROM notas WHERE id_materia = ?`, [idMateria], function(err, result) {
    if (err) throw err;
​
    con.query(`DELETE FROM materias WHERE id_materia = ?`, [idMateria], function(err, result) {
      if (err) throw err;
​
      res.send("Se ha eliminado la materia: " + idMateria);
    });
  });
​
});
​
// Reporte Notas de una Materia
app.get('/materia/:idMateria/notas', function(req, res) {
  var idMateria = parseInt(req.params.idMateria);
  if (isNaN(idMateria)) {
    return response.send("Debe ingresar un id de materia válido como parámetro.");
  }
​
  con.query(`SELECT e.id_estudiante, e.nombre, e.apellido, n.nota
    FROM notas n
    JOIN estudiantes e ON e.id_estudiante = n.id_estudiante
    WHERE n.id_materia = ?`, [idMateria], function(err, result) {
    if (err) throw err;
​
    res.send(result);
  });
});
​
// Reporte Notas de un Estudiante
app.get('/estudiante/:idEstudiante/notas', function(req, res) {
  var idEstudiante = parseInt(req.params.idEstudiante);
  if (isNaN(idEstudiante)) {
    return response.send("Debe ingresar un id de estudiante válido como parámetro.");
  }
​
  con.query(`SELECT e.id_estudiante, e.nombre, e.apellido, n.nota
    FROM notas n
    JOIN estudiantes e ON e.id_estudiante = n.id_estudiante
    WHERE n.id_estudiante = ?`, [idEstudiante], function(err, result) {
    if (err) throw err;
​
    res.send(result);
  });
});
​
//////////////////////////////
/////////// notas ////////////
//////////////////////////////
​
// Crear notas
app.post('/nota', function(req, res) {
  var nota = req.body;
  if (!nota.idEstudiante || !nota.idMateria || !nota.nota) {
    return res.send("El nombre y código de la materia no puede ser vacio");
  }
​
  if (nota.tipoExamen != "Parcial" && nota.tipoExamen != "Final" && nota.tipoExamen != "Recuperatorio") {
    return res.send("El parámetro tipoExamen solo puede ser uno de 'Parcial', 'Final' o 'Recuperatorio'");
  }
​
  var notaArray = [
    nota.idEstudiante,
    nota.idMateria,
    nota.tipoExamen,
    nota.nota,
  ];
​
  con.query("INSERT INTO notas (id_estudiante, id_materia, tipo_examen, nota) VALUES (?, ?, ?, ?) ", notaArray, function(err, result) {
    if (err) throw err;
​
    res.send("Se ha creado la nota: " + result.insertId);
  });
});