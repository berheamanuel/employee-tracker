// Import and require mysql2
const mysql = require('mysql2');

// Import and require inquirer
const inquier = require('inquirer');

// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password here
        password: 'wawa',
        database: 'employee_db'
    },
    console.log(`Connected to the movies_db database.`)

);

startPrompt();
// function to prompt questions 
function startPrompt () {
    const startQuestion = [{
        type: "list",
        name: "action",
        message: "what would you like to do?",
        loop: false,
        choices: [
            "View all employees",
            "View all roles",
            "View all departments",
            "add an employee",
            "add a role",
            "add a department",
            "update role for an employee",
            "update employee's manager",
            "view employees by manager",
            "delete a department",
            "delete a role",
            "delete an employee",
            "View the total utilized budget of a department",
            "quit"
        ]
    }]

    inquier.prompt(startQuestion)
        .then(response => {
            switch (response.action) {
                case "View all employees":
                    viewAll("EMPLOYEE");
                    break;
                case "View all roles":
                    viewAll("ROLE");
                    break;
                case "View all departments":
                    viewAll("DEPARTMENT");
                    break;
                case "add a department":
                    addNewDepartment();
                    break;
                case "add a role":
                    addNewRole();
                    break;
                case "add an employee":
                    addNewEmployee();
                    break;
                case "update role for an employee":
                    updateRole();
                    break;
                case "view employees by manager":
                    viewEmployeeByManager();
                    break;
                case "update employee's manager":
                    updateManager();
                    break;
                case "delete a department":
                    deleteDepartment();
                    break;
                case "delete a role":
                    deleteRole();
                    break;
                case "delete an employee":
                    deleteEmployee();
                    break;
                case "View the total utilized budget of a department":
                    viewBudget();
                    break;
                default:
                    connection.end();
            }
        })
        .catch(err => {
            console.error(err);
        });
}

