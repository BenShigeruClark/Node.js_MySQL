DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
        item_id INT NOT NULL AUTO_INCREMENT,
        product_name VARCHAR(50)NULL,
        department_name VARCHAR(20)NULL,
        price DECIMAL(10,2)NULL,
        stock_quantity INT NULL,
        PRIMARY KEY(item_id)
);
        
        
INSERT INTO products(product_name, department_name, price, stock_quantity)

VALUES ("Fujifilm XT2", "Camera", 1899.99, 15),  ("Moog Sub 31", "Music", 1599.00, 8), ("Godox AD200", "Camera", 299.00, 6), 
("Fender Telecaster", "Music", 899.99, 4), ("MacBook Pro", "Computers", 2300.00, 7), ("Pepperoni Pizza", "Food", 15.00, 500),
("Lens Cleaning Cloth", "Camera", 5.99, 339),("256TB SD Card", "Camera", 200000.00, 2), ("Iced Latte", "Food", 4.50, 1000),
("10TB Lacie hardrive", "Computers", 399.99, 10), ("Make Noise DPO", "Music", 599.99, 4), ("Ramen Bowl", "Food", 12.99, 2000);