// script base de datos

console.log("Starting SCRIPT");

// Base de datos

const MongoClient = require("mongodb").MongoClient;

MongoClient.connect('mongodb://localhost:27017/dbnodepop',function (err,db) {
    if(err){
        console.log("Error de conexion",err);
        return process.exit(1);
    }
    db.dropDatabase(function (err) {
        if(err){
            console.log("Error al limpiar la base de datos",err);
            return process.exit(1);
        }
    });
    anuncio1 = {
        "nombre": "Bicicleta",
        "venta": true,
        "precio": 230.15,
        "foto": "bici.jpg",
        "tags": [ "lifestyle", "motor"]
    }

    anuncio2 = {
        "nombre": "iPhone 3GS",
        "venta": false,
        "precio": 50.00,
        "foto": "iphone.png",
        "tags": [ "lifestyle", "mobile"]
    }

    anuncio3 = {
        "nombre": "Pelota Futbol",
        "venta": true,
        "precio": 10.00,
        "foto": "pelota.png",
        "tags": [ "lifestyle"]
    }
    usuario1 = {
        "nombre": "Yoel Macia Delgado",
        "email": "yoel@gmail.com",
        "clave": "12345"
    };

    usuario2 = {
        "nombre": "Paco Martinez Fernandez",
        "email": "paco@gmail.com",
        "clave": "98765"
    };

    usuario3 = {
        "nombre": "Yolanda Diaz Alvarez",
        "email": "yolanda@gmail.com",
        "clave": "55555"
    };
    db.collection("anuncios",function (err) {
        if(err){
            console.log("Error creando usuarios ",err);
            return process.exit(1);
        }
    }).save(anuncio1);
    db.collection("anuncios",function (err) {
        if(err){
            console.log("Error creando usuarios ",err);
            return process.exit(1);
        }
    }).save(anuncio2);
    db.collection("anuncios",function (err) {
        if(err){
            console.log("Error creando usuarios ",err);
            return process.exit(1);
        }
    }).save(anuncio3);
    db.collection("usuarios",function (err) {
        if(err){
            console.log("Error creando usuarios ",err);
            return process.exit(1);
        }
    }).save(usuario1);
    db.collection("usuarios",function (err) {
        if(err){
            console.log("Error creando usuarios ",err);
            return process.exit(1);
        }
    }).save(usuario2);
    db.collection("usuarios",function (err) {
        if(err){
            console.log("Error creando usuarios ",err);
            return process.exit(1);
        }
    }).save(usuario3);
});

console.log("Ending SCRIPT");