-- DROP DATABASE IF EXISTS bamazonDB;
-- CREATE DATABASE bamazonDB;
USE bamazonDB;


-- ### Create table ###
-- CREATE TABLE products (
--     item_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
--     product_name VARCHAR(30) NOT NULL,
--     department_name VARCHAR(20) NOT NULL,
--     price INT(10) NOT NULL,
--     stock_quantity INT(4)
-- );

INSERT INTO products
    (product_name, department_name, price, stock_quantity)
VALUES
    ("test item 1", "department 1", 1, 9),
    ("test item 2", "department 2", 22, 88),
    ("test item 3", "department 3", 333, 777)
;

-- ### purge test items from table ###
-- DELETE FROM products WHERE item_id BETWEEN 1 and 3;


SELECT *
from products;