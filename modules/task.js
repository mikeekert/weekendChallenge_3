var router = require('express').Router();
var pool = require('./pool');

router.get('/', function (req, res) {
    pool.connect(function (err, client, done) {
        if (err) {
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM weekend3', function (err, results) {
                done();
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.send(results.rows);
                }
            });
        }
    });
});

router.post('/', function (req, res) {
    var input = req.body;
    

    pool.connect(function (err, client, done) {
        if (err) {
            res.sendStatus(500);
        } else {
            console.log(input);
            client.query('INSERT INTO weekend3 (name) VALUES ($1)', [input.name], function (err, results) {
                console.log('added');
                done();
                if (err) {
                    res.sendStatus(500);

                } else {
                    res.send(results.rows);
                    console.log('sending res');
                }
            });
        }
    });
});

module.exports = router;