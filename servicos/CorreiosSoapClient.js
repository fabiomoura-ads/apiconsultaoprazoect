const soap = require('soap');

function CorreiosSoapClient(){
    this._url = "http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl";
}

CorreiosSoapClient.prototype.consultaPrazo = function(args, callback){
    console.log("CorreiosSoapClient.prototype.consultaPrazo");
    soap.createClient(this._url, function(erro, cliente){
        if ( erro) {
            console.log(erro);
            return;
        }
        cliente.CalcPrazo(args, callback);
    })
}

module.exports = function(){
    return CorreiosSoapClient;
}