var Pool = require('pg').Pool;

var config = {
    host: 'localhost',
    port:  5432,
    database: 'weekend3'
};

var pool = new Pool(config);

module.exports = pool;