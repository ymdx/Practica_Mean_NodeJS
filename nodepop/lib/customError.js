"use strict";

const fs = require('fs');
const config = require('../config');
const errorMessages = require('../errores.json');

module.exports = function(req, res, codigoError, status) {

    // Lenguaje por defecto ( español )

    const lang = 'es';

    var requestLang = null;

    // El encabezado HTTP de solicitud de Accept-Language anuncia qué idiomas es capaz de entender el cliente

    if (req.headers['accept-language']) {
        requestLang = req.headers['accept-language'];
    }

    // Asincrónicamente leemos el contenido del archivo...

    fs.readFile(config.ERRORES, 'utf8', function (err, data) {

        // Si tenemos errores

        if (err) {
            console.log("No puedo el json de errores" + config.ERRORES, err);
            return;
        }

        // Parseamos el json

        const mensajesError = JSON.parse(data);

        // metemos en una variable el contenido del lenguaje actual y el codigo de error....

        var des = mensajesError[lang][codigoError];

        // Si lo que nos trae el error es correcto lo metemos en el mensaje

        if (mensajesError && requestLang && mensajesError[requestLang] && mensajesError[requestLang][codigoError]) {
            des = mensajesError[requestLang][codigoError];
        }

        // Mandamos el estado como respuesta...

        res.status(status || 500 ).json({success: false, errorCode: codigoError, errorDescription: des});
    });
}