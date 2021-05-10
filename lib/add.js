const inquirer = require('inquirer');
const db = require('../db/connection');

//--------ADD DEPARTMENT----------
function addDepartment() {
    inquirer.prompt({
        type: 'input',
        name: 'department',
        message: 'What is the new department?'
    }).then(function (val) {
      // Add new department to SQL
        const sql = `INSERT INTO department (name)
                     VALUES
                     ('${val.department}')`;
    db.query(sql, (err, res) => {
      if (err) throw err
      const mainPrompt = require('./prompt.js'); mainPrompt();
    })
  })   
}

//--------ADD ROLE----------
function addRole() {
  // Pull from department SQL to populate question
    const sql = 'SELECT * FROM department'
    db.query(sql, (error, response) => {
        if (error) throw error;
        let deptArray = [];
        response.forEach((department) => {deptArray.push(department.name);});
    inquirer.prompt([
      {
        type: 'input',
        name: 'role',
        message: 'What is the new role?'
      },
      {
        type: 'number',
        name: 'salary',
        message: 'What is the new roles salary?(must be a number, max display of 6 figures)'
      },
      {
        type: 'list',
        name: 'department',
        message: 'What is the new roles department?',
        choices: deptArray
      }
    ]).then((val) => {
      // Set New Roles department id from response
      response.forEach((department) => {
        if (val.department === department.name) {deptId = department.id;}
      });
      // Populate role SQL with new role
      const sql =   `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
      const valArray = [val.role, val.salary, deptId]  ;
      db.query(sql, valArray, (error) => {
        if (error) throw error;
        const mainPrompt = require('./prompt.js'); mainPrompt();
      });  
    });
  });
};

//--------ADD EMPLOYEE----------
function addEmployee() {
  // Pull role sql data to populate question
  const sql = 'SELECT * FROM role';
  db.query(sql, (error, response) => {
      if (error) throw error;
      let roleArray = [];
      response.forEach((role) => {roleArray.push(role.title);});
      inquirer.prompt([
      {
        type: 'input',
        name: 'first',
        message: 'First name?'
      },
      {
        type: 'input',
        name: 'last',
        message: 'Last name?'
      },
      {
        type: 'list',
        name: 'title',
        message: 'What is their role?',
        choices: roleArray
      }
      ]).then((val) => {
      // Get role id from role.title choice
      response.forEach((role) => {
        if (val.title === role.title) {roleId = role.id;}
      })
      const valArray = [val.first, val.last, roleId];
      // Get manager sql data to populate question
      const getManager = 'SELECT * FROM manager';
      db.query(getManager, (error, response) => {
        if (error) throw error;
        let manArray = [];
        response.forEach((manager) => {manArray.push(manager.first_name + ' ' + manager.last_name);});
        manArray.push('No Manager');
        inquirer.prompt(
        {
          type: 'list',
          name: 'chooseManager',
          message: 'Who is their manager?',
          choices: manArray
        }
        ).then((val) => {
          // Set manager based on response by id or null if no manager
          response.forEach((manager) => {
            if (val.chooseManager === manager.first_name + ' ' + manager.last_name) {manId = manager.id;}
            if (val.chooseManager === 'No Manager') {manId = null;}
          })
          valArray.push(manId);
          // Add new employee to employee SQL
          const sql =`INSERT INTO employee (first_name, last_name,role_id, manager_id) VALUES (?, ?, ?, ?)`;
          db.query(sql, valArray, (error) => {
            if (error) throw error;
            const mainPrompt = require('./prompt.js'); mainPrompt();
          })
        });
      });
    });
  });
};

// //--------UPDATE EMPLOYEE ROLE----------
function updateRole() {
  // Populate question with employee SQL
  const sql = `SELECT employee.id, employee.last_name FROM employee`;
  db.query(sql, (error, response) => {
    if (error) throw error;
    let employeeNamesArray = [];
    response.forEach((employee) => {employeeNamesArray.push(employee.last_name);});
    inquirer
    .prompt(
        {
          name: 'chosenEmployee',
          type: 'list',
          message: 'What is the employees last name?',
          choices: employeeNamesArray
        })
        .then((val) => {
          // Pull employee ID off response
          response.forEach((employee) => {
            if (val.chosenEmployee === employee.last_name) {
              empId = employee.id;
              // Populate question with role SQL
              const sql = `SELECT role.id, role.title FROM role`;
              db.query(sql, (error, response) => {
                if (error) throw error;
                let rolesArray = [];
                response.forEach((role) => {rolesArray.push(role.title);});
                inquirer
                .prompt(
                {
                  name: 'chosenRole',
                  type: 'list',
                  message: 'What is the new role?',
                  choices: rolesArray
                })
                .then((val) => {
                  // Pull new role id off response
                  response.forEach((role) => {
                  if (val.chosenRole === role.title) {
                  roleId = role.id;
                  // Update the employee role in SQL
                  const sql =`UPDATE employee
                              SET role_id = ${roleId}
                              WHERE id = ${empId}`;
                  db.query(sql, (error) => {
                     if (error) throw error;
                     const mainPrompt = require('./prompt.js'); mainPrompt();
                  })
                }
              })
            })
          })
        }
      })
    })
  })
}

module.exports = { addDepartment, addRole, addEmployee, updateRole };