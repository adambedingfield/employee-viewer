const mysql = require('mysql2');
const accDetails = require('../account');


// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // your MySQL username
        user: accDetails.username,
        // Your MySQL password
        password: accDetails.pWord,
        database: 'company'
    },
    console.log('Connected to the election database.')
);

module.exports = db;