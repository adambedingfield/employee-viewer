const inquirer = require('inquirer');
const db = require('../db/connection');

function addDepartment() {
    inquirer.prompt({
        type: 'input',
        name: 'department',
        message: 'What is the new department?'
    }).then(function (val) {
        const sql = `INSERT INTO department (name)
                     VALUES
                     ('${val.department}')`;
    db.query(sql, (err, res) => {
      if (err) throw err
      const mainPrompt = require('./prompt.js'); mainPrompt();
    })
  })   
}

module.exports = { addDepartment };