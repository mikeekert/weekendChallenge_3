var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var index = require('./modules/index');
var path = require('path');
var task = require('./modules/task');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', index);
app.use('/task', task);

app.listen(3000, function(){
   console.log('working on:', 3000); 
});