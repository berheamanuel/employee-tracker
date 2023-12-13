SELECT role.id AS id, title, salary, department.name AS department
FROM role 
LEFT JOIN department ON role.department_id = department.id;

-- SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, role.title AS role, department.name AS department, CASE WHEN employee.manager_id IS NOT NULL THEN CONCAT(manager_table.first_name, " ", manager_table.last_name) AS manager
-- FROM employee JOIN role ON employee.role_id = role.id
-- JOIN department ON role.department_id = department.id
-- JOIN employee manager_table ON employee.manager_id = manager_table.id

SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, role.title AS title, department.name AS department, role.salary AS salary, CONCAT(employee.first_name, " ", employee.last_name) AS manager
FROM employee 
LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee AS ma ON employee.manager_id = ma.id