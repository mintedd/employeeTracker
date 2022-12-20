const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const db = require('./config/connection')

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function init() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'questions',
            message: 'What would you like to do',
            choices: ['View all employees', 'Add employee', 'Update employee role', 'View all roles', 'Add role', 'View all departments', 'Add department', 'Quit']
        },
    ])
        .then((userChoice) => { //need to create all these functions
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
                    db.end();
            }
        })

};


const employees = () => {
    //just show the table
    db.query(`SELECT * FROM employee`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
    });
    init();
};

const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the employees first name?',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the employees last name?',
        },
    ])
        .then(res => {
            let first_name= res.firstName
            let last_name= res.lastName

            db.promise().query()
                .then((res) => {
                    let roles = res
                    const roleChoices = roles.map(({ id, title }) => ({
                        name: title,
                        value: id
                    }));
                })


        })
    prompt({
        type: 'list',
        name: 'employeeRole',
        message: 'What is the employees role?',
        choices: roleChoices
    })
        .then(res => {
            let roleId = res.roleId;

            db.promise().query()
                .then((res) => {
                    let roles = res
                    const roleChoices = roles.map(({ id, title }) => ({
                        name: title,
                        value: id
                    }));
                })
            managerChoices.unshift({ name: "None", value: null });


        })
    prompt({
        type: "list",
        name: "managerId",
        message: "Who is the employee's manager?",
        choices: managerChoices
    })
        .then(res => {
            let employee = {
                manager_id: res.managerId,
                role_id: roleId,
                first_name: firstName,
                last_name: lastName
            }

            db.promise().query(employee);
        })
        .then(() => console.log(
            `Added ${firstName} ${lastName} to the database`
        ))
        .then(() => init())
};

const updateEmployee = () => {
    //prompt "which employees role would you like to update" -list
    //prompt "which role would you like to assign the selected employee to" -list
    //console.log "Updated ______ role in the database"

};

const roles = () => {
    db.query(`SELECT * FROM roles`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
    });
    init();
};

const addRole = () => {
    //prompt "what is the name of the role" -input
    //prompt "what is the salary of the role" (only numbers) -input
    //prompt "which department does the role belong to" -list
    // ['Engineering', 'Finance', 'Legal', 'Sales']
    //console.log "Added ______ to the database"
};

const dept = () => {
    db.query(`SELECT * FROM department`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
    });
    init();
};

const addDept = () => {
    //prompt "what is the name of the department" -input
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the department',
        },
    ])
        .then((ans) => {

        })
    //console.log "Added ______ to the database"
};


app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

init();