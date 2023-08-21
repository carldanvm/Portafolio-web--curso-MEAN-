// Importando dependencias
var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

// Estableciendo la Promesa de Mongoose a la Promesa global
mongoose.Promise = global.Promise;

// Conectarse a MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/portafolio")
        .then( () => {
            console.log("Conectado a MongoDB exitosamente...");

            // Crear el servidor
            app.listen(port, () => {
                console.log("Servidor corriendo en el puerto " + port);
            })

        })
        .catch((err) => {
            console.log(err);
            console.log("Error al conectar con MongoDB")
        })
