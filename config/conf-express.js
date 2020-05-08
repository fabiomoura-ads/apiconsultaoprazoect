var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');

module.exports = function(){
    var app = express();

    app.use(bodyParser.json());
    
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
        
    consign()
        .include('routes')
        .then('servicos')
        .into(app);

    return app;
}