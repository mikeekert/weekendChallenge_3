var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var index = require('./modules/index');
var path = require('path');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', index);


app.listen(3000, function(){
   console.log('working on:', 3000); 
});


