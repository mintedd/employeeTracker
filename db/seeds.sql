INSERT INTO department (department_name)
VALUES  ('Engineering'), 
        ('Finance'), 
        ('Legal'), 
        ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES  ('Sales Lead', 100000.00, 4),
        ('Salesperson', 80000.00, 4), 
        ('Lead Engineer', 150000.00, 1),
        ('Software Engineering', 120000.00, 1),
        ('Account Manager', 160000.00, 2), 
        ('Accountant', 125000.00, 2), 
        ('Legal Team Lead', 250000.00, 3), 
        ('Lawyer', 190000.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('John', 'Doe', 4, null),
        ('Mike', 'Chan', 4, 1),
        ('Ashley', 'Rodriguez', 1, null),
        ('Kevin', 'Tupik', 1, 3),
        ('Kunal', 'Singh', 2, null),
        ('Malia', 'Brown', 2, 5),
        ('Sarah', 'Lourd', 3, null),
        ('Tom', 'Allen', 3, 7);