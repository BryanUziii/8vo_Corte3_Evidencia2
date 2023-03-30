// Importar los módulos necesarios ucademy
const http = require("http");
const express = require("express");
const bodyparser = require("body-parser");

// Crear una instancia de Express
const app = express();
app.use(express.json());

//cors para poder mandar infor con axios
const cors = require('cors');
app.use(cors())

// Importar las rutas definidas en el archivo index.js dentro de la carpeta router
const misRutas = require("./router/index");
const path = require("path");


// Establecer el motor de plantillas como EJS
app.set("view engine","ejs");

// Establecer la carpeta pública para servir archivos estáticos
app.use(express.static(__dirname + "/public"));

// Analizar los cuerpos de las solicitudes HTTP
//app.use(bodyparser.urlencoded({ extended: true }));

// Registrar el motor de plantillas EJS para la extensión html
app.engine("html", require("ejs").renderFile);

// Usar las rutas definidas en misRutas
app.use(misRutas);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Agregar un middleware para manejar solicitudes no encontradas (404)
app.use((req, res, next) => {
  res.status(404).sendFile(__dirname + "/public/error.html");
});

// Iniciar el servidor en el puerto 3000 y mostrar un mensaje en la consola
const puerto = 3030;
app.listen(puerto, () => {
  console.log("Iniciando Puerto 3030");
});