INSERT INTO department (name)
VALUES
('Sales'),
('Engineering'),
('Legal'),
('HR'),
('Management');

INSERT INTO role (title, salary, department_id)
VALUES
('Representative', 80000, 1),
('Salesperson', 70000, 1),
('Front End Dev', 85000, 2),
('Back End Dev', 90000, 2),
('Lawyer', 100000, 3),
('Recruiter', 65000, 4),
('Trainer', 75000, 4),
('Manager', 95000, 5);

INSERT INTO manager (first_name, last_name)
VALUES
('Erica', 'Kee'),
('Xavier', 'Lightningbolt'),
('Dude', 'Chaac');

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Buddy', 'McFly', 1, 3),
('Dan', 'Theman', 2, 1),
('Doug', 'Peters', 2, 1),
('Bridget', 'Lorez', 3, 2),
('Hugo', 'Boykin', 3, 2),
('Kim', 'Tsunade', 4, 2),
('Clay', 'Yveddson', 4, 2),
('Tina', 'Sanday', 5, NULL),
('Robert', 'House', 6, 3),
('Marty', 'Robbins', 7, 2),
('Erica', 'Kee', 8, NULL),
('Xavier', 'Lightningbolt', 8, NULL),
('Dude', 'Chaac', 8, NULL);