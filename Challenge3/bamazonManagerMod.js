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
    // Load the possible manager menu options, pass in the products data
            managerOptions(res);
        });
    }

/* *** Manager selects View Products for Sale, app should list all available items
        which includes Item_Id's , name, prices, and quantities*/
// Load manager menu options then pass in product data
function managerOptions(products) {
    inquirer.prompt({
            type: "list",
            name: "choice",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"],      
            message: "What would you like to do?"
        })

    // Load manager options and pass the products data from database
        .then(function(val) {
            switch (val.choice) {
            case "View Products for Sale":
                console.table(products);
                managerMenu();
                break;
            case "View Low Inventory":
                loadLowInventory();
                break;
            case "Add to Inventory":
                addToInventory(products);
                break;
            case "Add New Product":
                promptManagerForNewProducts(products);
                break;
            default:
                console.log("Goodbye!");
                process.exit(0);
                break;
                
            }
        });
}


/* *** If a manager selects View Low Inventory, then it should list all items with
         an inventory count lower than five.*/

// Query the DB for low inventory products
function loadLowInventory() {
    // Selects all of the products that have a quantity of 5 or less.
    connection.query("SELECT * FROM products WHERE stock_quantity <=5", function(err, res) {
        if (err) throw err;
    // Draws the tabel in terminal using response, load the manager menu
        console.table(res);
        managerMenu();
    });
}

// Prompt the manager for product to re-stock.
function addToInventory(inventory) {
    console.table(inventory);
    inquirer.prompt([
        {
            type: "input",
            name: "choice",
            message: "What is the ID of the item you would like to add to?",
            validate: function(val) {
                return !isNaN(val);
            }
        }
    ])
    .then(function(val) {
        var choiceID = parseInt(val.choice);
        var product = checkInventory(choiceID, inventory);
        // If product is found with the chosen id...
        if (product) {
        // Pass the chosen product to promptCustomerForQuantity
        promptManagerForQuantity(product);
        } else {
        // Else let the user know and re-load the manager menu
        console.log("\nThat item is no longer in inventory!");
        managerMenu();
        }
    });
}

    // Ask for the quantity that should be added to the chosen product 
function promptManagerForQuantity(products) {
    inquirer.prompt([
        {
            type: "input",
            name: "quantity",
            message: "How many would you like to add?",
            validate: function(val) {
                return val > 0;
            }
        }
    ])
    .then(function(val) {
        var quantity = parseInt(val.quantity);
        addQuantity(products,quantity);
    });
}
// Update function that will update quantity of selected product
function addQuantity(product, quantity) {
    connection.query(
        "UPDATE products SET stock_quantity = ? WHERE item_id = ?",
        [product.stock_quantity + quantity, product.item_id],
        function(err, res) {
            // Let the user know the purchase was successful, re-load loadProducts
        console.log("\nSuccessfully added " + quantity + " " + product.product_name + "'s!\n");
        managerMenu();
        }
    );
}
/* *** If a manager selects Add to Inventory, your app should display a prompt 
        that will let the manager "add more" of any item currently in the store.*/
        // Asks the manager details about the new product
        //Adds new product to the db when complete
    function promptManagerForNewProducts(products) {
        inquirer.prompt([
            {
                type: "input",
                name: "product_name",
                message: "What is the name of the product you would like to add?"
            },
            {
                type: "list",
                name: "department_name",
                choices: getDepartments(products),
                message: "Which department does this product fall into?"
            },
            {
                type: "input",
                name: "price",
                message: "How much does it cost?",
                validate: function(val) {
                    return val > 0;
                }
            },
            {
                type: "input",
                name: "stock_quantity",
                message: "How many do we have?",
                validate: function(val) {
                    return !isNaN(val);
                }
            }
        ])
        .then(addNewProduct);
    }
        // Adds a new product to the database, loads the manager menu
    function addNewProduct(val) {
        connection.query(
            "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)",
            [val.product_name, val.department_name, val.price, val.quantity],
            function (err, res) {
                if (err) throw err;
                console.log(val.product_name + " Is Now Added to Bamazon!\n");
                // When done, re run managerMenu, then restart the app
                managerMenu();
            }
        );
    }
        // Take an array of product objects, return an array of their unique departments
    function getDepartments(products) {
        var departments = [];
        for (var i = 0; i < products.length; i++) {
            if (departments.indexOf(products[i].department_name) === -1) {
                departments.push(products[i].department_name);
            }
        }
        return departments;
    }
        // Check to see if the product user chose existss in inventory
    function checkInventory(choiceId, inventory) {
        for (var i = 0; i < inventory.length; i++) {
            if (inventory[i].item_id === choiceId) {
               // If matching product is found, return the product 
               return inventory[i];
            }
        }
         // Otherwise return null
         return null;
    }
        /* *** If a manager selects Add New Product, it should allow the manager to add 
        a completely new product to the store*/
