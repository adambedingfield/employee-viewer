const db = require('./db/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');

// Connect to Company Database
db.connect(function(err) {
    if (err) throw err
    mainPrompt();
});