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
  