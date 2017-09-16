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
            var text = 'INSERT INTO weekend3 (name) VALUES ($1)';
            var values = [input.name];
            client.query(text, values, function (err, results) {
                done();
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            });
        }
    });
});

module.exports = router;