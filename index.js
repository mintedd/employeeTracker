const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'windyspider',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

function init() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'questions',
            message: 'What would you like to do',
            choices: ['View all employees', 'Add employee', 'Update employee role', 'View all roles', 'Add role', 'View all departments', 'Add department', 'Quit']
        },
    ])
        .then((userChoice) => {
            switch (userChoice.questions) {
                case "View all employees":
                    employees();
                    break;
                case "Add employee":
                    addEmployee();
                    break;
                case "Update employee role":
                    updateEmployee();
                    break;
                case "View all roles":
                    roles();
                    break;
                case "Add role":
                    addRole();
                    break;
                case "View all departments":
                    dept();
                    break;
                case "Add department":
                    addDept();
                    break;
                default:
                    break;
            }
        })

};
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

init();