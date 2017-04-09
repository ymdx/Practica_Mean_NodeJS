const express = require('express');
const router = express.Router();

var crypto = require('crypto');
const jwt = require('jsonwebtoken');
const localConfig = require('../../config');

const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');
const jwtAuth = require('../../lib/autentificacion_jwt');

router.get('/', jwtAuth, function(req, res, next) {
    const query = Usuario.find();
    query.exec(function(err, rows) {
        if (err) {
            return customError(req, res, 'INTERNAL_ERROR', 500);
        }
        res.json({success: true, result: rows});
    });

});

router.post('/registro', jwtAuth, function(req, res, next) {
    console.log(req.body);

    const email = req.body.email;

    Usuario.findOne({email: email}).exec(function (err, user) {
        if (err) {
            return customError(req, res, 'INTERNAL_ERROR', 500);
        }
        if (user) {
            return customError(req, res, 'USUARIO_EXIST_ERROR', 406);
        }

        const usuario = new Usuario(req.body);
        var hash = crypto.createHash('sha256').update(usuario.clave).digest('base64');
        usuario.clave = hash;
        usuario.save(function(err, usuarioGuardado) {
            if (err) {
                return customError(req, res, 'USUARIO_VALIDATE_ERROR', 406);
            }
            res.status(200).json({success: true, result: usuarioGuardado});
        });

    });

});

router.post('/authenticate', function (req, res, next) {
    const email = req.body.email;
    const clave = crypto.createHash('sha256').update(req.body.clave).digest('base64');

    Usuario.findOne({email: email}).exec(function (err, user) {
        if (err) {
            return customError(req, res, 'INTERNAL_ERROR', 500);
        }
        if (!user) {
            return customError(req, res, 'USUARIO_NOTFOUND_ERROR', 404);
        }
        if (clave !== user.clave) {
            return customError(req, res, 'USUARIO_CLAVE_ERROR', 401);
        }
        jwt.sign({ user_id: user._id}, localConfig.jwt.secret, {
            expiresIn: localConfig.jwt.expiresIn
        }, function(err, token) {
            res.status(200).json({success: true, token});
        });
    });

});