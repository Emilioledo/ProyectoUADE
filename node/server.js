// var express = require('express');
// var mysql = require('mysql');
// var bodyParser = require('body-parser');
// var cors = require('cors');
// var app = express();
// app.options('*',cors());
// app.use(bodyParser.json());
// // Conectar con una Base de Datos
// var con = mysql.createConnection({
//   host: "104.155.161.18",
//   user: "root",
//   password: "uade",
//   database: "grupo8"
// });
// con.connect(function (err) {
//   if (err) throw err;
// });
// app.listen(3005, function(err) {
//   if (err) throw err;
//   console.log("Programa escuchando en puerto 3005");
// });
// app.post('/crearUsuario', function(req, res) {
//   var usuario = req.body;
// if (!usuario.nombre || !usuario.apellido || !usuario.mail || !usuario.password) {
//   return res.send("El nombre, apellido, el mail y la password del usuario no pueden quedar vacios");
// }
// var usuarioArray = [
//   usuario.nombre,
//   usuario.apellido,
//   usuario.mail,
//   usuario.password
// ];
// con.query("INSERT INTO user (first_name, last_name, email, password) VALUES (?, ?, ?, ?) ", usuarioArray, function(err, result) {
//   if (err) throw err;
//   res.send("Se ha creado el usuario: " + result.insertId);
// });
// });
// // Crear wallet
// app.post('/crearWallet', function(req, res) {
//   var billetera = req.body;
// if (!billetera.nombre || !billetera.tipo) {
//   return res.send("El nombre y el tipo de la billetera no pueden quedar vacios");
// };
// var billeteraArray = [
//   billetera.nombre,
//   billetera.tipo,
//   billetera.balance
// ];
// con.query("INSERT INTO wallet (name, type, balance) VALUES (?, ?, ?) ", billeteraArray, function(err, result) {
//   if (err) throw err;
//   res.send("Se ha creado la billetera: " + result.insertId);
// });
// });
// // Movimiento gasto
// app.post('/movimientoGasto', function(req, res) {
//   var movimiento = req.body;
// if (!movimiento.descripcion || !movimiento.valor|| !movimiento.fecha || !movimiento.tipoMovimiento) {
//   return res.send("La descripcion, el valor, fecha y el tipo de movimiento no pueden quedar vacios");
// }
// var movimientoArray = [
//   movimiento.descripcion,
//   movimiento.valor,
//   movimiento.fecha,
//   movimiento.categoria,
//   movimiento.tipoMovimiento    
// ];
// con.query("INSERT INTO income_expenses (description, value, date, category, type) VALUES (?, ?, ?, ?, ?) ", movimientoArray, function(err, result) {
//   if (err) throw err;
//   res.send("Se ha creado: " + result.insertId);
// });
// });

const express = require ('express');
const mongoose = require ('mongoose');
const nodemon = require ('nodemon');
const connectdb = require ('./config/database');
const Usuario = require ('../modelos/user');
const rutasUsuarios = require ('../routes/usuarios.js');
const app = express();


/*Puertos*/
let port = process.env.PORT || 3000;

app.use(rutasUsuarios);
connectdb();


app.listen (port, () =>{
  console.log ("Conectado");
});
