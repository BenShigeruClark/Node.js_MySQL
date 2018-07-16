// Initialize the npm packages to use
var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

// Initialize the connection variabel to sync with MySQL database
var connection = mysql.createConnection({
    host: "localhost",
// My port
    port: 3306,
// Username
    user: "root",
// Password
    password: "pmac+003",
// Databse
    database: "bamazonDB"
});

// Create the connection with the server to load the manager menu upon connection
    connection.connect(function(err) {
        if (err) {
            console.log("error connecting:" + err.stack);
        }
        managerMenu();
    });
// Get product from database using SELECT * FROM
    function managerMenu() {
        connection.query("SELECT * FROM products", function(err, res) {
            if (err) throw err;
            console.table(res);
            promptCustomerProduct(res);
        });
    }

/* *** Manager selects View Products for Sale, app should list all available items
        which includes Item_Id's , name, prices, and quantities*/
// Load manager menu options then pass in product data
function managerOptions(product) {
    inquirer.prompt({
            type: "list",
            name: "choice",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"],      
            message: "What would you like to do?"
        })
        
}
// Load manager options and pass the products data from database

/* *** If a manager selects View Low Inventory, then it should list all items with
         an inventory count lower than five.*/

// Query the DB for low inventory products

// Selects all of the products that have a quantity of 5 or less.

// Draws the tabel in terminal using response, load the manager menu

// Prompt the manager for product to re-stock.

// If product is found with the chosen id...

// Pass the chosen product to promptCustomerForQuantity

// Else let the user know and re-load the manager menu

// Ask for the quantity that should be added to the chose product 

// Update function that will update quantity of selected product

// Let the user know the purchase was successful, re-load loadProducts

/* *** If a manager selects Add to Inventory, your app should display a prompt 
        that will let the manager "add more" of any item currently in the store.*/

        // Asks the manager details about the new product

        //Adds new product to the db when complete

        // Adds a new product to the database, loads the manager menu

        // When done, re run loadManagerMenu, then restart the app

        // Take an array of product objects, return an array of their unique departments

        // Check to see if the product user chose existss in inventory

        // If matching product is found, return the product

        // Otherwise return null

/* *** If a manager selects Add New Product, it should allow the manager to add 
        a completely new product to the store*/
