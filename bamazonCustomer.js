
// variables to create a connection to MySQL database using npm packages
var mysql = require("mysql");

var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    //  my port I'm using
    port: 3306,
    // my username
    user: "root",
    // my password
    password: "pmac+003",
    // The database I want to link to
    database: "bamazonDB"
});

// Connects with the server and loads the product data
connection.connect(function(err) {
    if (err) {
        console.error("error connecting:" + err.stack);
    }
    displayProducts();
});

// This function will load products table from database and send results to the console.
function displayProducts() {
    // Selects the data from MySQL products table
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        // Logs the table into terminal
        console.table(res);
        // Prompts customer for the product id
        promptCustomerProduct(res);

    });
}

    // Function to prompt customer for item_id
function promptCustomerProduct(inventory) {
    // Prompts user with message: "Which product would you like to buy?"
    inquirer.prompt([

        {
            type: "input",
            name: "choice",
            message: "Which product would you like to buy?  [Quit with Q]",
            validate: function(val) {
                return !isNaN(val) || val.toLowerCase() == "q";
            }           
        }
             
    ])
        .then(function(val) {
              // Check if user wants to quit program
            checkIfUserQuit(val.choice);
            var choiceId = parseInt(val.choice);
            var product = checkInventory(choiceId, inventory);
    // When user chooses product by item_id, prompt the customer for quantity
            if (product) {
     // Pass the chosen product to promptCustomerForQuantity
                promptCustomerQuantity(product);
            } else {
            // else let the customer know the item is out of stock, reload displayProducts
                console.log("\nThat item is out of stock!");
                displayProducts();
            }
        });
   }

   //Function to prompt customer for quantity
   function promptCustomerQuantity(product) {
       inquirer.prompt([
           {
               type: "input",
               name: "quantity",
               message: "How many would you like? [Quit with Q]",
               validate: function(val) {
                   return val > 0 || val.toLowerCase() === "q";
               }
           }
       ])
       .then(function(val) {
           checkIfUserQuit(val.quantity);
           var quantity = parseInt(val.quantity);

        //If there is not enuogh product, let user know and re load displayProducts
        if (quantity > product.stock_quantity) {
            console.log("\nSorry out of stock on this one!");
            displayProducts();
        } else {
            soldProduct(product, quantity);
        }
      });
    }

    // Function for after prompts and item purchase went through, gives user a message for a successful purchase
    function soldProduct(product, quantity) {
        connection.query(
            "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
            [quantity, product.item_id],
            function(err, res) {
            console.log("\nYour purchase of " + quantity + " " + product.product_name + "'s was a success!  Enjoy your purchase!");
            displayProducts();
            }
        );
    }
    // Function with for loop to check inventory and make sure there is enough stock for a purchase
    function checkInventory(choiceId, inventory) {
        for (var i = 0; i < inventory.length; i++) {
            if (inventory[i].item_id === choiceId) {
                return inventory[i];
            }
        }
        return null;
    }
    // Function if user quits to log "Have a nice day!"
    function checkIfUserQuit(choice) {
        if (choice.toLowerCase() === "q") {
            console.log("Have a nice day!");
            process.exit(0);
        }
    }