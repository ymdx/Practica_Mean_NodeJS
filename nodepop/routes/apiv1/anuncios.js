"use strict";

var express = require('express');
var router = express.Router();

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
});

module.exports = router;

