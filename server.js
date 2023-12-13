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
        // MySQL password here
        password: 'wawa',
        database: 'employee_db'
    },
    console.log(`Connected to the movies_db database.`)

);

startPrompt();
// function to prompt questions 
function startPrompt() {
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
                    viewTables("EMPLOYEE");
                    break;
                case "View all roles":
                    viewTables("ROLE");
                    break;
                case "View all departments":
                    viewTables("DEPARTMENT");
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

// function to view tables based on user chooice
const viewTables = (table) => {
    // const query = `SELECT * FROM ${table}`;
    let query;
    if (table === "DEPARTMENT") {
        query = `SELECT * FROM DEPARTMENT`;
    } else if (table === "ROLE") {
        query = `SELECT role.id AS id, title, salary, department.name AS department
        FROM role 
        LEFT JOIN department ON role.department_id = department.id`;
    } else {//employee
        query = `
        SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, role.title AS title, department.name AS department, role.salary AS salary, CONCAT(employee.first_name, " ", employee.last_name) AS manager
        FROM employee 
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee AS ma ON employee.manager_id = ma.id`;

    }
    db.query(query, (err, result) => {
        if (err) throw err;
        console.table(result);

        startPrompt();
    });
};

//  function to add new departement
const addNewDepartment = () => {
    let questions = [
        {
            type: "input",
            name: "name",
            message: "what is the new department name?"
        }
    ];

    inquier.prompt(questions).then(response => {
        const query = `INSERT INTO department (name) VALUES (?)`;
        db.query(query, [response.name], (err, res) => {
            if (err) throw err;
            console.log(`Successfully added ${response.name} department with id ${res.insertId}`);

            startPrompt();
        });
    }).catch(err => {
        console.error(err);
    });
}

// function to add new role
const addNewRole = () => {
    //get the list of all department with department_id to make the choices object list for prompt question
    const departments = [];
    db.query("SELECT * FROM DEPARTMENT", (err, res) => {
        if (err) throw err;

        res.forEach(dep => {
            let colObj = {
                name: dep.name,
                value: dep.id
            }
            departments.push(colObj);
        });

        // question list to get arguments for making new roles
        let questions = [
            {
                type: "input",
                name: "title",
                message: "what is the title of the new role?"
            },
            {
                type: "input",
                name: "salary",
                message: "what is the salary of the new role?"
            },
            {
                type: "list",
                name: "department",
                choices: departments,
                message: "which department is this role in?"
            }
        ];

        inquier.prompt(questions).then(response => {
            const query = `INSERT INTO role (title, salary, department_id) VALUES (?)`;
            db.query(query, [[response.title, response.salary, response.department]], (err, res) => {
                if (err) throw err;
                console.log(`Successfully added ${response.title} role with id ${res.insertId}`);

                startPrompt();
            });
        })
            .catch(err => {
                console.error(err);
            });

    });
}

// function to add new employee
const addNewEmployee = () => {
    //get all the employee list to make choice of employee's manager
    db.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;

        //an employee could have no manager
        const employeeChoice = [
            {
                name: 'None',
                value: 0
            }
        ];

        res.forEach(({ first_name, last_name, id }) => {
            employeeChoice.push({
                name: first_name + " " + last_name,
                value: id
            });
        });

        //get all the role list to make choice of employee's role
        db.query("SELECT * FROM role", (err, res) => {
            if (err) throw err;
            const roleChoice = [];
            res.forEach(({ title, id }) => {
                roleChoice.push({
                    name: title,
                    value: id
                });
            });

            let questions = [
                {
                    type: "input",
                    name: "first_name",
                    message: "what is the employee's first name?"
                },
                {
                    type: "input",
                    name: "last_name",
                    message: "what is the employee's last name?"
                },
                {
                    type: "list",
                    name: "role_id",
                    choices: roleChoice,
                    message: "what is the employee's role?"
                },
                {
                    type: "list",
                    name: "manager_id",
                    choices: employeeChoice,
                    message: "who is the employee's manager? (could be null)"
                }
            ]

            inquier.prompt(questions)
                .then(response => {
                    const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?)`;
                    let manager_id = response.manager_id !== 0 ? response.manager_id : null;
                    db.query(query, [[response.first_name, response.last_name, response.role_id, manager_id]], (err, res) => {
                        if (err) throw err;
                        console.log(`successfully inserted employee ${response.first_name} ${response.last_name} with id ${res.insertId}`);

                        startPrompt();
                    });
                })
                .catch(err => {
                    console.error(err);
                });
        })
    });
}

// function to view total utilized budget of a department
const viewBudget = () => {
    db.query("SELECT * FROM DEPARTMENT", (err, res) => {
        if (err) throw err;

        const depChoice = [];
        res.forEach(({ name, id }) => {
            depChoice.push({
                name: name,
                value: id
            });
        });

        let questions = [
            {
                type: "list",
                name: "id",
                choices: depChoice,
                message: "which department's budget do you want to see?"
            }
        ];

        inquier.prompt(questions)
            .then(response => {
                const query = `SELECT department.name, SUM(salary) AS budget 
                FROM employee 
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id
                WHERE department.id = ?`;
                db.query(query, [response.id], (err, res) => {
                    if (err) throw err;
                    console.table(res);

                    startPrompt();
                });
            })
            .catch(err => {
                console.error(err);
            });
    });

};

// function to update role of an employee
const updateRole = () => {
    //get all the employee list 
    db.query("SELECT * FROM EMPLOYEE", (err, res) => {
        if (err) throw err;
        const employeeChoice = [];
        res.forEach(({ first_name, last_name, id }) => {
            employeeChoice.push({
                name: first_name + " " + last_name,
                value: id
            });
        });

        //get all the role list to make choice of employee's role
        db.query("SELECT * FROM ROLE", (err, rolRes) => {
            if (err) throw err;
            const roleChoice = [];
            rolRes.forEach(({ title, id }) => {
                roleChoice.push({
                    name: title,
                    value: id
                });
            });

            let questions = [
                {
                    type: "list",
                    name: "id",
                    choices: employeeChoice,
                    message: "whose role do you want to update?"
                },
                {
                    type: "list",
                    name: "role_id",
                    choices: roleChoice,
                    message: "what is the employee's new role?"
                }
            ]

            inquier.prompt(questions)
                .then(response => {
                    const query = `UPDATE EMPLOYEE SET ? WHERE ?? = ?;`;
                    db.query(query, [
                        { role_id: response.role_id },
                        "id",
                        response.id
                    ], (err, res) => {
                        if (err) throw err;

                        console.log("successfully updated employee's role!");

                        startPrompt();
                    });
                })
                .catch(err => {
                    console.error(err);
                });
        })
    });
}

// function to view employee by their manager
const viewEmployeeByManager = () => {

    //get all the employee list 
    db.query("SELECT * FROM EMPLOYEE", (err, res) => {
        if (err) throw err;
        const employeeChoice = [{
            name: 'None',
            value: 0
        }];
        res.forEach(({ first_name, last_name, id }) => {
            employeeChoice.push({
                name: first_name + " " + last_name,
                value: id
            });
        });

        let questions = [
            {
                type: "list",
                name: "manager_id",
                choices: employeeChoice,
                message: "employee under whose manager you want see?"
            },
        ]

        inquier.prompt(questions)
            .then(response => {
                let manager_id;
                let query;
                if (response.manager_id) {
                    query = `SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, role.title AS role, department.name AS department, CONCAT(M.first_name, " ", M.last_name) AS manager
                    FROM employee
                    LEFT JOIN role ON employee.role_id = role.id
                    LEFT JOIN department ON role.department_id = department.id
                    LEFT JOIN employee AS M ON employee.manager_id = M.id
                    WHERE employee.manager_id = ?;`;
                } else {
                    manager_id = null;
                    query = `SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, role.title AS role, department.name AS department, CONCAT(M.first_name, " ", M.last_name) AS manager
                    FROM employee
                    LEFT JOIN role ON employee.role_id = role.id
                    LEFT JOIN department ON role.department_id = department.id
                    LEFT JOIN employee AS M ON employee.manager_id = M.id
                    WHERE employee.manager_id is null;`;
                }
                db.query(query, [response.manager_id], (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    startPrompt();
                });
            })
            .catch(err => {
                console.error(err);
            });
    });
}

// function to update a manager
const updateManager = () => {

    //get all the employee list 
    db.query("SELECT * FROM EMPLOYEE", (err, res) => {
        if (err) throw err;
        const employeeChoice = [];
        res.forEach(({ first_name, last_name, id }) => {
            employeeChoice.push({
                name: first_name + " " + last_name,
                value: id
            });
        });

        //an employee could have no manager
        const managerChoice = [{
            name: 'None',
            value: 0
        }];

        res.forEach(({ first_name, last_name, id }) => {
            managerChoice.push({
                name: first_name + " " + last_name,
                value: id
            });
        });

        let questions = [
            {
                type: "list",
                name: "id",
                choices: employeeChoice,
                message: "whose manager do you want to update?"
            },
            {
                type: "list",
                name: "manager_id",
                choices: managerChoice,
                message: "whos is the employee's new manager?"
            }
        ];

        inquier.prompt(questions)
            .then(response => {
                const query = `UPDATE EMPLOYEE SET ? WHERE id = ?;`;
                let manager_id = response.manager_id !== 0 ? response.manager_id : null;
                db.query(query, [
                    { manager_id: manager_id },
                    response.id
                ], (err, res) => {
                    if (err) throw err;

                    console.log("successfully updated employee's manager");

                    startPrompt();
                });
            })
            .catch(err => {
                console.error(err);
            });
    })

};



