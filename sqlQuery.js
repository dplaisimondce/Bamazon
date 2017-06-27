exports.sqlQuery = {
selectAllProducts: 'SELECT * FROM products',

searchProductByName: 'SELECT * FROM products WHERE LOWER(product_name) LIKE  ?',

updateItem: 'UPDATE products SET stock_quantity = ?, product_sales = ? WHERE item_id = ?',

addInventory: 'UPDATE products SET stock_quantity = ? WHERE item_id = ?',

updateDepartmentSales: 'UPDATE departments SET total_sales = total_sales + ? WHERE LOWER(department_name) = ?',

lowInventoryList: 'SELECT * FROM products WHERE stock_quantity <=100',

searchProductById: 'SELECT * FROM products WHERE item_id =  ?',

addNewProduct: 'INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES (?,?,?,?)',

addNewDepartment: 'INSERT INTO departments (department_name ,over_head_costs) VALUES (?,?)',

selectAllDepartments: 'SELECT *,(total_sales-over_head_costs) AS total_profit FROM departments'

}