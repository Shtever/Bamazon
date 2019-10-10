-- DROP DATABASE IF EXISTS bamazonDB;
-- CREATE DATABASE bamazonDB;
USE bamazonDB;


		### Create table ###
-- CREATE TABLE products (
--     item_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
--     product_name VARCHAR(30) NOT NULL,
--     department_name VARCHAR(20) NOT NULL,
--     price INT(10) NOT NULL,
--     stock_quantity INT(4)
-- );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES

    ("Sushi Knife", "Kitchen", 25, 200),
	("Cutting Board", "Kitchen", 15, 300),
    ("Binoculars", "Outdoors", 30, 100),
    ("Tent", "Outdoors", 80, 200),
    ("Compass", "Outdoors", 20, 400),
    ("Office Chair", "Office", 100, 100),
	("Desk", "Office", 100, 200),
    ("Keyboard", "Office", 20, 1000),
    ("Drum Set", "Music", 600, 100),
    ("Guitar", "Music", 90, 200);
    

-- ### purge test items from table ###
-- DELETE FROM products WHERE item_id BETWEEN 1 and 3;


SELECT * FROM products;
SHOW TABLES;
DESCRIBE products;