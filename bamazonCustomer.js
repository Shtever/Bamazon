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



// ============================================================FUNCTIONS==================================================== //

// ------------------------------------------------- Test Connection ------------------------------------------- //
// function testConnection() {
//     connection.query("SHOW tables", function (err, res) {
//         if (err) {
//             console.log(err)
//         } else {
//             console.log("connection successful");
//         }
//     })
// } connection.end()


// ------------------------------------------ Start Function ---------------------------------------------------- //
function start() {
    connection.query("SELECT * FROM products;", function (err, res) {
        if (err) {
            console.log(err);
            console.log("NO DICE");
        }
        else {
            console.log("SUCCESSFULLY CONNECTED TO DB");
            // For loop to display items //
            for (var i = 0; i < res.length; i++) {
                var idArray = (chalk.bold.blue("ID: ")) + (chalk.bold.yellow(res[i].item_id)) +
                    " - " + res[i].department_name +
                    " - " + res[i].product_name +
                    ": $" + (chalk.bold.green(res[i].price));

                // Log array of items //
                console.log(idArray);
            }
            console.log(chalk.bold.blue("==============================="));

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
                // ==========Switch Statement for different ID selections =========
                .then(function (answer1) {
                    switch (answer1.item) {
                        case "1":
                            var Index = res[0]
                            purchaseItem();
                            break;

                        case "2":
                            var Index = res[1]
                            purchaseItem();
                            break;

                        case "3":
                            var Index = res[2]
                            purchaseItem();
                            break;

                        case "4":
                            var Index = res[3]
                            purchaseItem();
                            break;

                        case "5":
                            var Index = res[4]
                            purchaseItem();
                            break;

                        case "6":
                            var Index = res[5]
                            purchaseItem();
                            break;

                        case "7":
                            var Index = res[6]
                            purchaseItem();
                            break;

                        case "8":
                            var Index = res[7]
                            purchaseItem();
                            break;

                        case "9":
                            var Index = res[8]
                            purchaseItem();
                            break;

                        case "10":
                            var Index = res[9]
                            purchaseItem();
                            break;

                        // =============== Default if incorrect input is entered, console log message ============== //
                        default:
                            console.log((chalk.bold.yellow("Check your input! " + (chalk.bold.blue(answer1.item)) + " is not a valid ID")));
                            break;
                    }

                    // -------PURCHASE ITEM -------------- //
                    function purchaseItem() {
                        var Ans = answer1;
                        if (Ans.quantity <= Index.stock_quantity) {
                            console.log(chalk.bold.green("\nID: ") + Ans.item +
                                (chalk.bold.yellow("\nProduct: ")) + Index.product_name +
                                (chalk.bold.yellow("\nQuantity: ")) + Ans.quantity +
                                (chalk.bold.blue("\nPURCHASE COMPLETE!" +
                                    "\nYou will receive an email when your items are shipped\n")));
                            var updatedQuantity = Index.stock_quantity - Ans.quantity
                            // =============== Reduce quantity entered from stock quantity ======================== //
                            connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: updatedQuantity }, { item_id: Ans.item }], function (err, result) {
                                if (err)
                                    console.log(err);
                            })
                            connection.end();
                        }
                        // =========== If quantity ordered > stock, Console log "We only have XX in stock" =============== //
                        else {
                            console.log(
                                chalk.bold.yellow("\nYikes! We only have " + Index.stock_quantity + " " + Index.product_name + "s in stock!") +
                                (chalk.bold.blue("\nYou'll need to adjust your quantity\n")));
                            connection.end();
                        }
                    }
                });
        }
    });
}