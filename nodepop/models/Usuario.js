"use strict";

const mongoose = require("mongoose");

// Primero definimos un esquema:

const usuarioSchema = mongoose.Schema({
    nombre: String,
    email: String,
    clave: String
});

// Y luego creamos el modelo :

var Usuario = mongoose.model("Usuario",usuarioSchema);

// no necesitamos exportar el modelo ya que podriamos recuperarlo con:
// var Usuario = mongoose.model("Usuario");

const usuario = new Usuario({
    nombre: "Televisión", email: "paco@gmail.com", clave: "012345678"
});

//usuario.save();