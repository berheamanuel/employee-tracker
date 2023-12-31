# Employee Tracker

## Description
This command-line application used to view and interact with their employee information

## User Story

- AS A business owner
- I WANT to be able to view and manage the departments, roles, and - employees in my company
- SO THAT I can organize and plan my business

## Acceptance Criteria

* GIVEN a command-line application that accepts user input
* WHEN I start the application
* THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
* WHEN I choose to view all departments
* THEN I am presented with a formatted table showing department names and department ids
* WHEN I choose to view all roles
* THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
* WHEN I choose to view all employees
* THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
* WHEN I choose to add a department
* THEN I am prompted to enter the name of the department and that department is added to the database
* WHEN I choose to add a role
* THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
* WHEN I choose to add an employee
* THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
* WHEN I choose to update an employee role
* THEN I am prompted to select an employee to update and their new role and this information is updated in the database

## Demonstration

* https://drive.google.com/file/d/1QXanPtcPC81DD1QfuUxqUI_2ARCq9LCq/view

    ![QR Code](image.png)

## Installation

* Before attempting to use this project, make sure to have these programs installed on your computer: VS Code GitBash Node.js
* Steps to initialize the project:
1. Copy Link: Hit the "Code" button within this GitHub repo to copy link and clone localy
2. Run npm i to install all dependencies
3. Within the directory for this project, initialize prompts using the command "node server.js".

## Technologies Used

* MySQL
* Node.js
* Inquirer
* JavaScript
* Git Bash
* VS Code


## Referrence
* MySQL class activity
* https://stackoverflow.com/questions/3709560/joining-three-tables-using-mysql

## MIT License License
