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
startManager();



// ============================================================FUNCTIONS==================================================== //

// ------------------------------------------------- Test Connection ------------------------------------------- //
// function testConnection() {
//     connection.query("SHOW tables", function (err, res) {
//         if (err) {
//             console.log(err)
//         } else {
//             console.log("connection successful");
//             console.log("WELCOME TO BAMAZON MANAGEMENT SYSTEM");
//         }
//     })
// } connection.end()

function startManager() {
    connection.query("SELECT * FROM products;", function (err, res) {
        if (err) {
            console.log(err);
        }
        else {
            console.table(res)
            inquirer.prompt([{
                type: "input",
                name: "ID",
                message: "Please enter the ITEM_ID to restock"
            },
            {
                type: "input",
                name: "quantity",
                message: "Please enter the restock quantity"
            }])
                .then(function (answer) {
                    var ID = answer.ID;
                    // console.log(answer.ID)
                    var Index = res[ID-1]
                    // console.log(Index.stock_quantity);
                    var newStock = +Index.stock_quantity + +answer.quantity;
                    connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: newStock }, { item_id: answer.ID }], function (err, result) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log("Way to go! You've restocked item " + answer.ID + ".\n" +
                            "There are now " + newStock + " stocked!")
                        }
                    })
                    connection.end();
                })


        }
    })
}