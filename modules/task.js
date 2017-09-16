var router = require('express').Router();
var pool = require('./pool');

router.get('/', function (req, res) {
    pool.connect(function (err, client, done) {
        if (err) {
            res.sendStatus(500);
        } else {
            client.query('SELECT * FROM weekend3 ORDER BY complete, id', function (err, results) {
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

router.delete('/:id', function (req, res) {
    var dbID = req.params.id;
    pool.connect(function (err, client, done) {
        if (err) {
            res.sendStatus(500);
        } else {
            client.query('DELETE FROM weekend3 WHERE id = $1', [dbID], function () {
                done();
                if (err) {
                    res.sendStatus(500);
                } else {
                    console.log('deleted');
                    res.sendStatus(201);
                }
            });
        }
    });
});

router.put('/', function (req, res) {
    var update = req.body.id;
    pool.connect(function (err, client, done) {
        if (err) {
            res.sendStatus(500);
        } else {
            client.query('UPDATE "weekend3" SET "complete"=TRUE WHERE "id"=$1', [update], function (err, results) {
                done();
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.sendStatus(203);
                }
            });
        }
    });
});

module.exports = router;