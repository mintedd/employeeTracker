const express = require("express");
const mysql = require("mysql2");
const inquirer = require("inquirer");
const db = require('./db/connection');

// const PORT = process.env.PORT || 3003;
// const app = express();

// // Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());


db.connect(error => {
    if (error) {
        console.error(error)
        return;
    }
    promptUser();
})

const promptUser = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'questions',
            message: 'What would you like to do',
            choices: [
                'View all employees',
                'Add employee',
                'Update employee role',
                'View all roles',
                'Add role',
                'View all departments',
                'Add department',
                'Quit'
            ]
        },
    ])
        .then((userChoice) => {
            switch (userChoice.questions) {
                case 'View all employees':
                    //done
                    viewAllEmployees();
                    break;
                case 'Add employee':
                    //done
                    addEmployee();
                    break;
                case 'Update employee role':
                    updateEmployeeRole();
                    break;
                case 'View all roles':
                    //done
                    viewAllRoles();
                    break;
                case 'Add role':
                    //done
                    addRole();
                    break;
                case 'View all departments':
                    //done
                    viewAllDepartments();
                    break;
                case 'Add department':
                    //done
                    addDepartment();
                    break;
                default:
                    quit()

            }
        })
}

//do all the views first
//will be used in sequence to another
const viewAllEmployees = () => {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name, role.salary, manager.first_name || ' ' || manager.last_name AS 'Manager' FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id`, (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser();

    })
}

const viewAllRoles = () => {
    db.query(`SELECT role.id, role.title, role.salary, department.department_name FROM role JOIN department ON role.department_id = department.id`, (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser();

    })
}

const viewAllDepartments = () => {
    db.query(`SELECT * FROM department`, (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser();
    })
}

const addEmployee = () => {
    db.query(`SELECT title FROM role`, (err, res) => {
        if (err) throw err;

        const roleChoices = res.map(role => role.title);

        inquirer.prompt([
            {
                type: 'input',
                message: 'What is their first name?',
                name: 'employeeFirstName'
            },
            {
                type: 'input',
                message: 'What is their last name?',
                name: 'employeeLastName'
            },
            {
                type: 'list',
                message: 'What is their role?',
                name: 'employeeRole',
                choices: roleChoices
            },
            {
                type: 'input',
                message: 'Who is their manager (type manager ID or NULL if no manager)?',
                name: 'employeeManager'
            },
        ])
            .then(answers => {
                const employeeFirstName = answers.employeeFirstName;
                const employeeLastName = answers.employeeLastName;
                const employeeRole = answers.employeeRole;

                db.query(`SELECT id FROM role WHERE title = '${employeeRole}'`, (err, res) => {
                    if (err) throw err;
                    const roleId = res[0].id;

                    db.query(`INSERT INTO employee (first_name, last_name, role_id) VALUES ('${employeeFirstName}', '${employeeLastName}', '${roleId}')`, (err, res) => {
                        if (err) throw err;
                        viewAllEmployees();
                    });
                });
            });
    });
}

const addRole = () => {
    db.query(`SELECT department_name FROM department`, (err, res) => {
        if (err) throw err;

        const departmentChoices = res.map(department => department.department_name);

        inquirer.prompt([
            {
                type: 'list',
                message: 'What department is this role in?',
                name: 'roleDepartment',
                choices: departmentChoices
            },
            {
                type: 'input',
                message: 'What role would you like to add?',
                name: 'roleName'
            },
            {
                type: 'input',
                message: 'What is the salary for this role?',
                name: 'roleSalary'
            }
        ])

            .then(answers => {
                const roleName = answers.roleName;
                const roleSalary = answers.roleSalary;
                const roleDepartment = answers.roleDepartment;

                db.query(`SELECT id FROM department WHERE department_name = '${roleDepartment}'`, (err, res) => {
                    if (err) throw err;
                    const departmentId = res[0].id;

                    db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${roleName}', '${roleSalary}', '${departmentId}')`, (err, res) => {
                        if (err) throw err;

                        viewRoles();
                    });
                });
            });
    });
}

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What department would you like to add?',
            name: 'departmentName'
        }
    ])

        .then(answers => {
            const departmentName = answers.departmentName;
            db.query(`INSERT INTO department (department_name) VALUES ('${departmentName}')`, (err, res) => {
                if (err) throw err;
            })
            viewDepartments();
        });
};

const updateEmployeeRole = () => {
    db.query(`SELECT id, first_name, last_name FROM employee`, (err, employees) => {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Which employee would you like to update?',
                choices: employees.map(employee => {
                    return { name: `${employee.first_name} ${employee.last_name}`, value: employee.id };
                })
            }
        ])
            .then(employeeeAnswer => {
                const employeeId = employeeeAnswer.employee;

                db.query(`SELECT id, title FROM role`, (err, roles) => {
                    if (err) throw err;

                    inquirer.prompt([
                        {
                            type: 'list',
                            message: 'What is the new role for the selected employee?',
                            name: 'role',
                            choices: roles.map(role => {
                                return { name: role.title, value: role.id }
                            })
                        }
                    ])

                        .then(roleAnswer => {
                            const roleId = roleAnswer.role;

                            //Updates emloyee role
                            db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [roleId, employeeId], (err, res) => {
                                if (err) throw err;
                                console.log(chalk.bgCyan(`Congrats! You have updated the employee role!`));
                                //once done, prompts user again
                                viewAllEmployees();
                            });
                        });
                });
            });
    });
}

// app.use((req, res) => {
//     res.status(404).end();
// });

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });