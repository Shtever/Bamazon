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
inquirer.prompt([{
    type: "list",
    name: "choice",
    message: "What would you like to do Mr. Bezos?",
    choices: ["View Products for Sale", "Restock", "View Low Inventory (<50)", "Add New Product"]
}])
    .then(function (response) {
        switch (response.choice) {
            case "View Products for Sale":
                connection.query("SELECT * FROM products", function (err, forSale) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.table(forSale);
                    }
                })
                connection.end();
                break;
            case "Restock":
                startManager()
                break;
            case "View Low Inventory (<50)":
                connection.query("SELECT * FROM products WHERE stock_quantity < 51", function (err, lowInv) {
                    if (err) {
                        console.log(err);
                        connection.end();
                    }
                    else {
                        for (var i = 0; i < lowInv.length; i++)
                            console.log(lowInv[i].product_name + ": " + lowInv[i].stock_quantity);
                        connection.end();
                    }
                })
                connection.end();
                break;
            case "Add New Product":
                inquirer.prompt([{
                    type: "input",
                    name: "itemName",
                    message: "Please enter item name"
                },
                {
                    type: "input",
                    name: "itemDept",
                    message: "Please enter item Department"
                },
                {
                    type: "input",
                    name: "itemPrice",
                    message: "Please enter item Price"
                },
                {
                    type: "input",
                    name: "itemQuant",
                    message: "Please enter starting quantity"
                }])
                .then(function (response){
                    var newItem = "'" + response.itemName + "', " + "'" + response.itemDept + "', " + response.itemPrice + ", " + response.itemQuant
                    connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (" + newItem + ");", function (err,result){
                        if(err){
                            console.log(err);
                            connection.end()
                        }else {
                            console.log("Item added!")
                            console.log("Item: " + response.itemName +
                            "\nDepartment: " + response.itemDept +
                            "\nPrice: " + response.itemPrice + 
                            "\nQuantity: " + response.itemQuant);
                            connection.end();
                        }
                        })
                    }
                    
                )

        }
    })




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
                    var Index = res[ID - 1]
                    // console.log(Index.stock_quantity);
                    var newStock = +Index.stock_quantity + +answer.quantity;
                    connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: newStock }, { item_id: answer.ID }], function (err, result) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log((chalk.bold.cyan("Way to go! You've restocked item " + (chalk.bold.magenta(answer.ID)) + ".\n" +
                                "There are now " + (chalk.bold.magenta(newStock)) + " stocked!")))
                        }
                    })
                    connection.end();
                })


        }
    })
}