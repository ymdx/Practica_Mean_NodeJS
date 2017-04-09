"use strict";

var express = require('express');
var router = express.Router();

// Cargamos para detectar los errores

const customError = require('../../lib/customError');

// Cargamos mongoose y el modelo de anuncios

const mongoose = require("mongoose");
const Anuncio = mongoose.model("Anuncio");

router.get("/", function (req,res,next) {

    const query = Anuncio.find();
    query.exec(function (err,rows) {
        if(err){
           return next(err);
        }
        res.json({success: true, result: rows});
    });

    // No me funciona...
    //Anuncio.list(null,function(err, rows) {
    //    if(err) {
    //        return next(err);
    //    }
    //    res.json({success: true, result: rows});
    // });

    const nombre = req.query.nombre;
    const venta= req.query.venta;
    const precio = req.query.precio;
    const tags = req.query.tags;

    const filter = {};

    if (nombre) {
        filter.nombre = new RegExp('^' + nombre, "i");
    }
    if (tags) {
        filter.tags = tags;
    }
    if (venta) {
        filter.venta = venta;
    }
    if(precio) {
        const separador = precio.split('-');
        if (separador.length === 2) {
            if (separador[0] == "") {
                filter.precio = {'$lte': separador[1]}
            }
            else if (separador[1] == "") {
                filter.precio = {'$gte': separador[0]}
            } else {
                filter.precio = {'$gte': separador[0], '$lte': separador[1]}
            }
        } else {
            filter.precio = parseInt(precio);
        }
    }

    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.skip);
    const fields = req.query.fields;
    const sort = req.query.sort;

    Anuncio.list(filter, limit, skip, fields, sort, function(err, rows) {
        if (err) {
                return customError(req, res, 'ANUNCIO_REQ_ERROR', 400);
        }
        rows.forEach(function(row) {
            row.foto = url.format({
                protocol: req.protocol,
                host: req.get('host'),
                pathname: "/public/images/anuncios/" + row.foto
            });
        });
        res.status(200).json({success: true, result: rows});
    });

});

router.get('/:id', function(req, res, next) {
    const query = Anuncio.findOne({_id: req.params.id});
    query.exec(function(err, anuncio) {
        if (err) {
            console.log(err.message);
            let error = new Error('INTERNAL_ERROR');
            error.status = 500;
            return next(error);
        }
        if (!anuncio) {
            return customError(req, res, 'NUNCIO_NOTFOUND_ERROR', 404);
        }
        anuncio.foto = url.format({
            protocol: req.protocol,
            host: req.get('host'),
            pathname: "/public/images/anuncios/" + anuncio.foto
        });

        res.json({success: true, result: anuncio});
    });
});

router.post('/', function(req, res, next) {
    const anuncio = new Anuncio(req.body);
    anuncio.save(function(err, anuncioGuardado) {
        if (err) {
            return customError(req, res, 'INTERNAL_ERROR', 500);
        }
        res.json({success: true, result: anuncioGuardado});
    });
});

router.put('/:id', function(req, res, next) {
    const id = req.params.id;
    const anuncio = req.body;
    Anuncio.update({_id: id}, anuncio, function(err) {
        if (err) {
            return customError(req, res, 'INTERNAL_ERROR', 500);
        }
        res.json({success: true});
    });
});

router.delete('/:id', function(req, res, next) {
    const id = req.params.id;
    Anuncio.remove({_id: id}, function(err) {
        if (err) {
            return customError(req, res, 'INTERNAL_ERROR', 500);
        }
        res.json({success: true});
    });
});

router.get('/tags', function(req, res, next) {
    Anuncio.distinct('tags', function(err, tags) {
        if(err) {
            return customError(req, res, 'TAGS_NOTFOUND_ERROR');
        }
        res.json({success: true, tags});
    });
});



module.exports = router;

