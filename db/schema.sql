DROP DATABASE IF EXISTS employee_db;
-- Creates the "employee_db" database --
CREATE DATABASE employee_db;

-- Makes it so all of the following code will affect employee_db --
USE employee_db;

-- Creates the table "department" within employee_db --
CREATE TABLE department (
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  -- Makes a string column called "name" which cannot contain null --
  name VARCHAR(30) NOT NULL
);

-- Creates the table "role" within employee_db --
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

-- Creates the table "employee" within employee_db --

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL,
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);