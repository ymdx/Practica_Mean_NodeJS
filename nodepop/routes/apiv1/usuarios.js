
"use strict";

const express = require('express');
const router = express.Router();

const sha256 = require('sha256');
const jwt = require('jsonwebtoken');

const customError = require('../../lib/customError');
const config = require('../../config');

const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

router.post("/", function(req, res, next) {
    const nombre = req.body.nombre;
    const email = req.body.email;
    const clave = req.body.clave;

    const usuario = new Usuario({
        nombre: nombre,
        email: email,
        clave: sha256(clave)
    });

    Usuario.save(function(err, usuario) {
        if(err) {
            if (err.code === 11000) {
                return customError(req, res, 'USUARIO_EXIST_ERROR', 400);
            } else if (err.name === "ValidationError") {
                return customError(req, res, 'USUARIO_VALIDATE_ERROR', 400);
            } else {
                return customError(req, res, 'USUARIO_ADD_ERROR');
            }
        }
        res.json({success: true, usuario: usuario});
    });

});

router.post("/authenticate", function(req, res, next) {
    const email = req.body.email;
    const clave = req.body.clave;

    Usuario.findOne({email: email}).exec(function(err, user) {
        if (err) {
            return next(err);
        }
        if(!usuario) {
            return customError(req, res, 'USUARIO_NOTFOUND_ERROR', 401);
        }
        if(!clave || usuario.clave !== sha256(clave)) {
            return customError(req, res, 'USUARIO_CLAVE_ERROR', 401);
        }
        jwt.sign({email: email}, config.jwt.PASS, {expiresIn: config.jwt.TIEMPO_PASS}, function(err, token) {
            if(err) {
                return customError(req, res, 'USUARIO_SIGNTOKEN_ERROR');
            }
            res.json({success: true, token: token});
        });
    });
});

module.exports = router;