
// variables to create a connection to MySQL database using npm packages
var mysql = require("mysql");

var inquirer = require("inquirer");
// require("console.table");

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


connection.connect(function(err) {
    if (err) {
        console.error("error connecting:" + err.stack);
    }
    displayProducts();
});

function displayProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.table(res);
        promptCustomer();

    });
}


function promptCustomer(inventory) {

    inquirer.prompt([

        {
            type: "input",
            name: "choice",
            message: "Which product would you like to buy?",
            validat: function(val) {
                return !isNaN(val) || val.toLowerCase() == "q";
            }            // name: "action",
            // type: "list",
            // message: "Which item number would you like to choose?",
            // choices: [
            //     "1", "2", "3", "4", "5", "6",
            //     "7", "8", "9", "10", "11", "12"
            
            
        }
       
        // After the prompt, store the user's response in a variable called location.
    ])
    
//     .then(function (answer) {
//         console.log(answer)

//     .then(function(answer) {
//         switch (answer.action) {
//             case "Find item by id":
//             productSearch();
//             break;
//         }
//     })
// });
       
};
