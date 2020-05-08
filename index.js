const app = require('./config/conf-express')();

app.listen(3005, function(){
    console.log("Servidor online...");
});