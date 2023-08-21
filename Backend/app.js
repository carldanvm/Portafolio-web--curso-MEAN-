// Importar módulos requeridos
var bodyParser = require('body-parser'); // Middleware para analizar los cuerpos de las solicitudes
var express = require('express'); // Marco de trabajo web para Node.js

// Inicializar la aplicación express
var app = express();

// Cargar archivos de rutas
var project_routes = require('./routes/project'); // Archivo que contiene las definiciones de las rutas para el endpoint '/api'

// Aplicar middlewares
app.use(bodyParser.urlencoded({extended: false})); // Analizar cuerpos de solicitudes codificados en URL
app.use(bodyParser.json()); // Analizar cuerpos de solicitudes en formato JSON

//Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
})



// Definir las rutas
app.use('/api', project_routes); // Montar project_routes en el endpoint '/api'

// Exportar la aplicación para su uso externo
module.exports = app;
