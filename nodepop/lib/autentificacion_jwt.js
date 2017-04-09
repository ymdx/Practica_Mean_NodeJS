"use strict";

const jwt = require('jsonwebtoken');
const customError = require('./customError');
const config = require('../config');

module.exports = function(req, res, next) {

    // Generamos el token

    const token = req.body.token || req.query.token || req.get('x-access-token');

    // Si no existe

    if(!token) {
        return customError(req, res, "USUARIO_TOKENNOTFOUND_ERROR", 401);
    }

    // Para verificar el token pasarlo a metodo verify con la clave secreta que se usó para firmar el token

    jwt.verify(token, config.jwt.PASS, function(err, tokenDecoded) {
        if(err) {
            return customError(req, res, "USUARIO_INVALIDO_ERROR", 401);
        }
        req.email = tokenDecoded.email;
        next();
    });
}