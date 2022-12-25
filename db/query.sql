-- easier to format the queries here, going to copypaste into .query()

-- view all departments
-- table showing department names and department ids
SELECT *
FROM departments

-- view all roles
-- job title, role id, the department that role belongs to, and the salary for that role
SELECT role.title, role.id, department.name, role.salary
FROM roles
JOIN departments ON roles.departments_id = departments_id

-- view all employees
-- table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
SELECT employees.id, 
CONCAT (employees.first_name, employee.last_name) AS Name,
CONCAT (employees.first_name, employee.last_name) AS Manager,
roles.title AS Role,
departments.name AS Department, 
roles.salary AS Salary, 
FROM employees 
JOIN roles ON employees.role_id = roles.id
JOIN departments ON roles.departments_id = departments.id
JOIN employees ON employees.id = employees.manager_id

-- add a department
INSERT INTO departments (id, name),
SET ? 
-- ? is going to be the answers 

-- add a role
INSERT INTO roles ,
SET ? 
-- ? is going to be the answers 

-- add an employee
INSERT INTO employees ,
SET ? 
-- ? is going to be the answers 

-- update an employee role
UPDATE employees 
SET role_id = ?
WHERE id = ?