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
// // Test Connection //
// function testConnection() {
//     connection.query("SHOW tables", function (err, res) {
//         if (err) {
//             console.log(err)
//         } else {
//             console.log("connection successful");
//         }
//     })
// } connection.end()


// Start Function //
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
            // Create table // - SCRAPPED
            // console.table(res); - SCRAPPED


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
                            //======== If item orderes < stock quantity, console log ID, Item, Quantity, and "PURCHASE COMPLETE"
                            if (answer1.quantity <= res[0].stock_quantity) {
                                console.log(chalk.bold.green("ID: ") + answer1.item +
                                    (chalk.bold.yellow("\nProduct: ")) + res[0].product_name +
                                    (chalk.bold.yellow("\nQuantity: ")) + answer1.quantity + 
                                    (chalk.bold.blue("\nPURCHASE COMPLETE!" +
                                        "\nYou will receive an email when your items are shipped")));
                                    var updatedQuantity = res[0].stock_quantity - answer1.quantity
                                //***NOT FUNCTIONAL*** =============== Reduce quantity entered from stock quantity ======================== //
                                connection.query("UPDATE products SET ? WHERE ?", [{stock_quantity: updatedQuantity}, {item_id: answer1.item}], function (err, result) {
                                    if (err)
                                        throw err;
                                        
                                })
                            }
                            // =========== If quantity ordered > stock, Console log "We only have XX in stock" =============== //
                            else {
                                console.log(
                                    chalk.bold.yellow("\nYikes! We only have " + res[0].stock_quantity + " " + res[0].product_name + "s in stock!") +
                                    (chalk.bold.blue("\nYou'll need to adjust your quantity\n")));
                                connection.end();
                                break;
                            }
                            connection.end();
                            break;


                        // ============= Additional Cases - NEED TO DRY UP ================

                        // case "2":
                        //     console.log(chalk.bold.green("ID: ") + answer1.item +
                        //         (chalk.bold.yellow("\nProduct: ")) + res[1].product_name +
                        //         (chalk.bold.yellow("\nQuantity: ")) + answer1.quantity);
                        //     break;

                        // case "3":
                        //     console.log(chalk.bold.green("ID: ") + answer1.item +
                        //         (chalk.bold.yellow("\nProduct: ")) + res[2].product_name +
                        //         (chalk.bold.yellow("\nQuantity: ")) + answer1.quantity);
                        //     break;

                        // case "4":
                        //     console.log(chalk.bold.green("ID: ") + answer1.item +
                        //         (chalk.bold.yellow("\nProduct: ")) + res[3].product_name +
                        //         (chalk.bold.yellow("\nQuantity: ")) + answer1.quantity);
                        //     break;

                        // case "5":
                        //     console.log(chalk.bold.green("ID: ") + answer1.item +
                        //         (chalk.bold.yellow("\nProduct: ")) + res[4].product_name +
                        //         (chalk.bold.yellow("\nQuantity: ")) + answer1.quantity);
                        //     break;

                        // case "6":
                        //     console.log(chalk.bold.green("ID: ") + answer1.item +
                        //         (chalk.bold.yellow("\nProduct: ")) + res[5].product_name +
                        //         (chalk.bold.yellow("\nQuantity: ")) + answer1.quantity);
                        //     break;

                        // case "7":
                        //     console.log(chalk.bold.green("ID: ") + answer1.item +
                        //         (chalk.bold.yellow("\nProduct: ")) + res[6].product_name +
                        //         (chalk.bold.yellow("\nQuantity: ")) + answer1.quantity);
                        //     break;

                        // case "8":
                        //     console.log(chalk.bold.green("ID: ") + answer1.item +
                        //         (chalk.bold.yellow("\nProduct: ")) + res[7].product_name +
                        //         (chalk.bold.yellow("\nQuantity: ")) + answer1.quantity);
                        //     break;

                        // case "9":
                        //     console.log(chalk.bold.green("ID: ") + answer1.item +
                        //         (chalk.bold.yellow("\nProduct: ")) + res[8].product_name +
                        //         (chalk.bold.yellow("\nQuantity: ")) + answer1.quantity);
                        //     break;

                        // case "10":
                        //     console.log(chalk.bold.green("ID: ") + answer1.item +
                        //         (chalk.bold.yellow("\nProduct: ")) + res[9].product_name +
                        //         (chalk.bold.yellow("\nQuantity: ")) + answer1.quantity);
                        //     break;
                        // =============== Default if incorrect input is entered, console log message ============== //
                        default:
                            console.log((chalk.bold.yellow("Check your input! " + (chalk.bold.blue(answer1.item)) + " is not a valid ID")));
                            connection.end();
                            break;
                    }
                });
        }
    });
}