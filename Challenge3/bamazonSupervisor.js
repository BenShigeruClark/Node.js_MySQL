// Require dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");


// Configure connection to database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: ""
})
// Connecting to our database, running makeTable which will start the app

// Display the initial list of products for the user, calling promptSupervisor

// Give the user some options for what to do next

// Check to see what option the user chose and run the appropriate function

// Ask the user about the department they would like to add

// Using user information entered to create a new department

// If successful, alert the user, run makeTabel again

// Select a few colums from the departments table, calculate a total_profit column