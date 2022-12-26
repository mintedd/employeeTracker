const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
const connection = require('./db/connection')

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

init();

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
                    viewAllEmployees();
                    break;
                // case "Add employee":
                //     addEmployee();
                //     break;
                // case "Update employee role":
                //     updateEmployee();
                //     break;
                case "View all roles":
                    viewAllRoles();
                    break;
                // case "Add role":
                //     addRole();
                //     break;
                case "View all departments":
                    viewAllDept();
                    break;
                // case "Add department":
                //     addDept();
                //     break;
                default:
                    db.end();
            }
        })

};


const viewAllEmployees = () => {
    //just show the table
    connection.query(`SELECT employees.id, CONCAT (employees.first_name, employee.last_name) AS Name, CONCAT (employees.first_name, employee.last_name) AS Manager, roles.title AS Role, departments.name AS Department, roles.salary AS Salary, FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.departments_id = departments.id JOIN employees ON employees.id = employees.manager_id`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
    });
    init();
};

// const addEmployee = () => {
//     inquirer.prompt([
//         {
//             type: 'input',
//             name: 'firstName',
//             message: 'What is the employees first name?',
//         },
//         {
//             type: 'input',
//             name: 'lastName',
//             message: 'What is the employees last name?',
//         },
//     ]).then((res) => {
//         connection.query('INSERT INTO employees SET ?',
//             {
//                 first_name: res.firstName,
//                 last_name: res.lastName
//             })
//         prompt({
//             type: 'list',
//             name: 'employeeRole',
//             message: 'What is the employees role?',
//             choices: roleChoices
//         }).then(res => {
//             let roleId = res.roleId;

//             connection.promise().query()
//                 .then((res) => {
//                     let roles = res
//                     const roleChoices = roles.map(({ id, title }) => ({
//                         name: title,
//                         value: id
//                     }));
//                 })
//             managerChoices.unshift({ name: "None", value: null })
//         })
//         prompt({
//             type: "list",
//             name: "managerId",
//             message: "Who is the employee's manager?",
//             choices: managerChoices
//         })
//             .then(res => {
//                 let employee = {
//                     manager_id: res.managerId,
//                     role_id: roleId,
//                     first_name: firstName,
//                     last_name: lastName
//                 }

//                 connection.promise().query(employee);
//             })
//             .then(() => console.log(
//                 `Added ${firstName} ${lastName} to the database`
//             ))
//             .then(() => init())
//     })
// };

//     prompt({
//         type: "list",
//         name: "managerId",
//         message: "Who is the employee's manager?",
//         choices: managerChoices
//     })
//         .then(res => {
//             let employee = {
//                 manager_id: res.managerId,
//                 role_id: roleId,
//                 first_name: firstName,
//                 last_name: lastName
//             }
//     managerChoices.unshift({ name: "None", value: null })
//             connection.promise().query(employee);
//         })
//         .then(() => console.log(
//             `Added ${firstName} ${lastName} to the database`
//         ))
//         .then(() => init())
// })
// };

// const updateEmployee = () => {
//     //prompt "which employees role would you like to update" -list
//     //prompt "which role would you like to assign the selected employee to" -list
//     //console.log "Updated ______ role in the database"

// };

const viewAllRoles = () => {
    connection.query(`SELECT roles.title, roles.id, departments.name, roles.salary
    FROM roles
    JOIN departments ON roles.departments_id = departments_id`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
    });
    init();
};

// const addRole = () => {
//     //prompt "what is the name of the role" -input
//     //prompt "what is the salary of the role" (only numbers) -input
//     //prompt "which department does the role belong to" -list
//     // ['Engineering', 'Finance', 'Legal', 'Sales']
//     //console.log "Added ______ to the database"
// };

const viewAllDept = () => {
    connection.query(`SELECT * FROM departments`, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.table(result);
    });
    init();
};

// const addDept = () => {
//     //prompt "what is the name of the department" -input
//     inquirer.prompt([
//         {
//             type: 'input',
//             name: 'department',
//             message: 'What is the name of the department',
//         },
//     ])
//         .then((ans) => {

//         })
//     //console.log "Added ______ to the database"
// };


app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});