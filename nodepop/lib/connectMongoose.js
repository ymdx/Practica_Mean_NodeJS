"use strict";

const mongoose = require("mongoose");

const cont = mongoose.connection;
mongoose.Promise = global.Promise;

// suscribirse a posibles errores de conexión

cont.on("error",function (err) {
    console.log("Error de conexión ", err);
    return process.exit(1);
});

cont.once("open",function () {
    console.log("Conectado a mongodb");
});

// realizar la conexión
mongoose.connect("mongodb://localhost:27017/dbnodepop");