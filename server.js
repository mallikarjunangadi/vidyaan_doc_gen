var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var dbConfig = require('./app/dbConfig/db');
var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/src"));
dbConfig.connect(function(err, db) {
    if(err) {
       return console.log('mongodb connection error');
    }
    console.log('mongodb connected');
}) 
require('./app/routes')(app);

app.listen(port, () => {
    console.log('server running at '+port);
})
