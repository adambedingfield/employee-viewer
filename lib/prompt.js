const inquirer = require('inquirer');
const { viewEmployees, viewRoles, viewDepartments } = require('./filterTable');

function mainPrompt() {
    inquirer.prompt([
    {
    type: "list",
    message: "What would you like to do?",
    name: "choice",
    choices: [
              "View All Employees", 
              "View All Roles",
              "View All Departments"
            ]
    }
]).then(function(val) {
        switch (val.choice) {
            case "View All Employees":
              viewEmployees();
            break;
            
            case "View All Roles":
                viewRoles();
            break;
            
            case "View All Departments":
                viewDepartments();
            break;
        }
    })
}

module.exports = mainPrompt;