const mysql = require('mysql2');
const accDetails = require('../account');


// Connect to database
// SQL username and password stored
// in .gitignored account.js sheet
const db = mysql.createConnection(
    {
        host: 'localhost',
        // SQL port
        port: 3306,
        // your MySQL username
        user: accDetails.username,
        // Your MySQL password
        password: accDetails.pWord,
        database: 'company'
    },
    console.log('Connected to company database')
);

module.exports = db;