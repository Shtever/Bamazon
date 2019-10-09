var sql = require("mysql");
var inquirer = require("inquirer");
var chalk = require("chalk");

var connection = sql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "qwerty00",
    database: "bamazonDB"
});
// testConnection();
start();




















// ===============================FUNCTIONS============================= //
// Test Connection //
function testConnection() {
    connection.query("SHOW tables", function (err, res) {
        if (err) {
            console.log(err)
        } else {
            console.log("connection successful");
        }
    })
} connection.end()


// Start Function //
function start() {
    connection.query("SELECT * FROM products;", function (err, res) {
        if (err) {
            console.log(err);
            console.log("NO DICE");
        }
        else {
            console.log("SUCCESSFULLY CONNECTED TO DB");
            // For loop to list items //
            for (var i = 0; i < res.length; i++) {
                var idArray = "ID: " + res[i].item_id + " - " + res[i].product_name + ": $" + res[i].price;
                console.log(idArray);
            }
            // Input prompt for user to select item/quantity //
            inquirer.prompt([{
                type: "input",
                name: "item",
                message: "Please enter the ID of the item you would like to purchase",
            },
            {
                type: "input",
                name: "quantity",
                message: "Please enter the quantity of  you would like to purchase"
            }])
                .then(function (answer) {
                    console.log(chalk.bold.green("Product: ") + answer.item +
                        (chalk.bold.yellow("\nQuantity: ")) + answer.quantity);

                    // confirm //
                    inquirer.prompt([{
                        type: "confirm",
                        name: "confirm",
                        message: "confirm?"
                    }])
                })
        }
    })
}