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

// metodo estatico :

anuncioSchema.statics.list = function(filter, limit, skip, fields, sort, callback) {
    // Filtro
    const query = Anuncio.find(filter);

    // Limite de instancias
    query.limit(limit);

    // Para saltar.
    query.skip(skip);

    // Para incluir
    query.select(fields);

    // Para ordenar
    query.sort(sort);

    // Para el callback
    query.exec(callback);
};

// no necesitamos exportar el modelo ya que podriamos recuperarlo con:
// var Anuncio = mongoose.model("Anuncio");

//const anuncio = new Anuncio({nombre: "Televisión", venta: true, precio: 201.12,
//    foto: "tele.jpg", tags: ["lifestyle"]
//});

//anuncio.save();