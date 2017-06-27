var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');
var query = require('./sqlQuery.js');
var customerRequest = require('./customerRequest.js');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password:  'Plaisimond2k',
    database: 'Bamazon'

});


connection.connect(function(err) {
    if (err) throw err
    displayAllProducts('customer');
    
})

var pushTableData = function(results, table) {
    results.forEach(function(row, index) {
        var displayArray = new Array(5);
        displayArray[0] = row.item_id,
            displayArray[1] = row.product_name,
            displayArray[2] = row.department_name,
            displayArray[3] = row.price,
            displayArray[4] = row.stock_quantity
        table.push(displayArray);
    })
}



var displayAllProducts = function(userProfile) {

    connection.query(query.sqlQuery.selectAllProducts, function(selectQueryError, results, fields) {
        if (selectQueryError) throw selectQueryError;
        var table = new Table({
            });

        pushTableData(results, table);
        console.log(table.toString());
        
        requestForPurchase();

    })

}


var requestForPurchase = function() {
    inquirer.prompt([{
                name: 'inquirePurchaseAnswer',
                message: 'Do you want to Purchase Items ?',
                type: 'list',
                choices: ['Yes','No']
              }]).then(function(userResponse) {
        if (userResponse.inquirePurchaseAnswer.toLowerCase() == 'yes' || userResponse.inquirePurchaseAnswer.toLowerCase() == 'y') {
            purchaseProducts();
        } else {
            connection.end();
        }
    })

}

var printReceipt = function(productName, productPrice, productQuantity, productId) {
    console.log('Items successfully purchased!');
}

var purchaseProducts = function() {
    inquirer.prompt([{
    name: 'requestedItem',
    message: 'Please enter the Product Name you wish to Purchase',
    type: 'input'
    }]).then(function(itemAnswer) {
        inquirer.prompt([{
        name: 'requestedNumber',
        message: 'Please enter the count of the items you wish to Purchase',
        type: 'input'
        }]).then(function(quantityAnswer) {
            connection.query(query.sqlQuery.searchProductByName, "%" + [itemAnswer.requestedItem] + "%", function(selectQueryError, results, fields) {
                if (selectQueryError) throw selectQueryError;
                console.log(results.length);
                if (results.length === 1) {
                    var dbStockQuantity = 0;
                    var dbItemId = 0;
                    var dbPrice = 0;
                    var dbProductName = '';
                    var dbDepartmentName = '';
                    results.forEach(function(row, index) {
                        dbStockQuantity = row.stock_quantity;
                        dbItemId = row.item_id;
                        dbPrice = row.price;
                        dbProductName = row.product_name;
                        dbDepartmentName = row.department_name;
                    })
                    if (dbStockQuantity >= quantityAnswer.requestedNumber) {
                        
                        connection.query(query.sqlQuery.updateItem, [dbStockQuantity - quantityAnswer.requestedNumber, parseFloat(quantityAnswer.requestedNumber * dbPrice), dbItemId], function(updateQueryError, results, fields) {
                            if (updateQueryError) throw updateQueryError;
                            console.log("Items Successfully Purchased");
                            printReceipt(dbProductName, dbPrice, quantityAnswer.requestedNumber, dbItemId);

                            
                            connection.query(query.sqlQuery.updateDepartmentSales, [parseFloat(quantityAnswer.requestedNumber * dbPrice), dbDepartmentName.toLowerCase()], function(departmentInsertQueryError, results, fields) {
                                if (departmentInsertQueryError) throw departmentInsertQueryError;
                            })
                            displayAllProducts();
                        })
                    } else {
                        console.log('\u2717' + ' Insufficient Quantity - Please enter a valid quantity');
                        requestForPurchase();
                    }

                } else if (results.length === 0)

                {
                    console.log('\u2717' + ' No results matched your criteria - Please enter a valid Product name');
                    requestForPurchase();
                } else {
                    console.log('\u2717' + ' More than one results matched your criteria - Please enter a Product');
                    requestForPurchase();
                }

            })

        })

    })
}