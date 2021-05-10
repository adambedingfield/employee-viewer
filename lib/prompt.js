const inquirer = require('inquirer');
const { addDepartment, addRole, addEmployee, updateRole } = require('./add');
const { viewEmployees, viewRoles, viewDepartments } = require('./filterTable');

function mainPrompt() {
    inquirer.prompt([
    {
    type: "list",
    message: "What would you like to do?",
    name: "home",
    choices: [
              "View All Employees", 
              "View All Roles",
              "View All Departments",
              "Add Department",
              "Add Role",
              "Add Employee",
              "Update Role"
            ]
    }
]).then(function(val) {
        switch (val.home) {
            case "View All Employees":
              viewEmployees();
            break;
            
            case "View All Roles":
                viewRoles();
            break;
            
            case "View All Departments":
                viewDepartments();
            break;

            case "Add Department":
                addDepartment();
            break;
            case "Add Role":
                addRole();
            break;
            case "Add Employee":
                addEmployee();
            break;
            case "Update Role":
                updateRole();
            break;
        }
    })
}

module.exports = mainPrompt;