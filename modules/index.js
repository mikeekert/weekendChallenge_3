var router = require('express').Router();
var path = require('path');

router.get('/', function(req,res) {
    res.sendFile(path.resolve('./public/views/index.html'));
});

module.exports = router;