"use strict";

const mongoose = require("mongoose");

// Primero definimos un esquema:

const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

// Y luego creamos el modelo :

var Anuncio = mongoose.model("Anuncio",anuncioSchema);

// no necesitamos exportar el modelo ya que podriamos recuperarlo con:
// var Anuncio = mongoose.model("Anuncio");

const anuncio = new Anuncio({nombre: "Televisión", venta: true, precio: 201.12,
    foto: "tele.jpg", tags: ["lifestyle"]
});

anuncio.save();