const { check, validationResult } = require('express-validator');

module.exports = function(app){

    const api = '/api/correios/consultaprazo';
    const arCdServico = [ 40010 /* SEDEX */, 41106 /* PAC */ ];

    const validaArgs = [
        check("nCdServico", "Código do Serviço não informado.").notEmpty(),
        check("nCdServico", "Código do Serviço é inválido").isIn(arCdServico),
        check("sCepOrigem", "CEP Origem é obrigatório.").notEmpty(),
        check("sCepOrigem", "CEP Origem deve conter somente números.").isNumeric(),
        check("sCepOrigem", "CEP Origem deve possuir 8 dígitos.").isLength({min:8, max:8}),
        check("sCepDestino", "CEP Destino é obrigatório.").notEmpty(),
        check("sCepDestino", "CEP Destino deve conter somente números.").isNumeric(),
        check("sCepDestino", "CEP Destino deve possuir 8 dígitos.").isLength({min:8, max:8})
    ];

    app.post(api, validaArgs, function(req, resp){

        var erros = validationResult(req);
        if ( !erros.isEmpty() ){
            resp.status(400).json(erros);
            return;
        }

        new app.servicos.CorreiosSoapClient()
        .consultaPrazo(req.body, function(erro, resultado){
            if ( erro ) {
                resp.status(400).json(erro);
                return;
            }
            resp.json(resultado);
        })
    })
}