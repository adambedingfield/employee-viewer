const db = require('../db/connection');
const cTable = require('console.table');


// All Employees
function viewEmployees() {
    const sql = `SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name,' ', manager.last_name) AS manager
                 FROM employee
                 INNER JOIN manager ON employee.manager_id = manager.id
                 INNER JOIN department ON role_id = department.id
                 INNER JOIN role ON employee.role_id = role.id
                 `
    db.query(sql, (err, res) => {
      if (err) throw err
      console.table(res)
      const mainPrompt = require('./prompt.js'); mainPrompt();
  })
}

// By role
function viewRoles() {
    const sql = `SELECT role.id, role.title, role.salary, department.name
                 AS department
                 FROM role
                 JOIN department ON role.department_id = department.id`;
    db.query(sql, (err, res) => {
      if (err) throw err
      console.table(res)
      const mainPrompt = require('./prompt.js'); mainPrompt();
  })
}

// By department
function viewDepartments() {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, res) => {
      if (err) throw err
      console.table(res)
      const mainPrompt = require('./prompt.js'); mainPrompt();
  })
}
module.exports = { viewEmployees, viewRoles, viewDepartments};