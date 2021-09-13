 CREATE DATABASE cultivomasamadre_app;

 CREATE TABLE products(
   id BIGSERIAL NOT NULL PRIMARY KEY,
   name VARCHAR(200) NOT NULL,
   deleted BOOLEAN NOT NULL DEFAULT false,
   price INT NOT NULL,
   imageurl VARCHAR(1024) NULL
 );

--Insertamos los productos en BD
INSERT INTO products (name, price, imageurl) VALUES ('Pan de Campo', 200, 'https://i.ibb.co/pj9V6n4/pandecampo.png' );
INSERT INTO products (name, price, imageurl) VALUES ('Pan de Molde con Semillas', 180, 'https://i.ibb.co/1J83XVB/pan-de-molde-semillas.png' );
INSERT INTO products (name, price, imageurl) VALUES ('Pan de Molde', 140, 'https://i.ibb.co/ynYF6gr/pan-de-molde.png'  );
INSERT INTO products (name, price, imageurl) VALUES ('Baguette', 100, 'https://i.ibb.co/Z2hS9Tw/baguette.png' );
INSERT INTO products (name, price, imageurl) VALUES ('Focaccia de Cherry y Romero', 250, 'https://i.ibb.co/HNTj5Jq/focaccia-cherry.png'  );
INSERT INTO products (name, price, imageurl) VALUES ('Focaccia de Quesos artesanales', 280, 'https://i.ibb.co/thm8tPJ/focaccia-queso-artesanal.png'  );
INSERT INTO products (name, price, imageurl) VALUES ('Focaccia de Queso y Cebolla', 280, 'https://i.ibb.co/dcMTFnH/focaccia-queso-y-cebolla.png'  );
INSERT INTO products (name, price, imageurl) VALUES ('Focaccia de Cebolla y pimenton ahumado', 250, 'https://i.ibb.co/sswC3bJ/cebolla-pimenton.png'  );
INSERT INTO products (name, price, imageurl) VALUES ('Croissants', 60, 'https://i.ibb.co/6rLN5Px/croissants.png'  );
INSERT INTO products (name, price, imageurl) VALUES ('Mini Croissants de Queso', 45, 'https://i.ibb.co/2cqJ7Zv/croissants-queso.png'  );
INSERT INTO products (name, price, imageurl) VALUES ('Pan de Chocolate', 50, 'https://i.ibb.co/7zTp55f/pan-de-choco.png'  );
INSERT INTO products (name, price, imageurl) VALUES ('Cinnamon roll', 80, 'https://i.ibb.co/CHDW9dS/cinnamon-roll.png'  );


CREATE TABLE stock(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    amount INT NOT NULL, 
    id_product BIGINT NOT NULL REFERENCES products(id)
);

CREATE TABLE sales(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name_client VARCHAR (200) NOT NULL,
    adenda VARCHAR (300),
    date DATE NOT NULL,
    total_price INT NOT NULL  
);

CREATE TABLE sales_products(
    id_product BIGINT NOT NULL REFERENCES products(id),
    id_sales BIGINT NOT NULL REFERENCES sales(id),
    amount INT NOT NULL
);

-- sales products
-- sales ID: 3 Products 10, 11 , 15
id_product - id_sales - amount
10              3          5
11              3          1
15              3          2

--Creando una Venta 
--Insertamos la Venta
INSERT INTO sales (name_client, adenda, date, total_price) VALUES ('Pepito', ' ' , '24-08-2021', 5000 );

--Insertamos los Sales_Products
INSERT INTO sales_products (id_product, id_sales, amount) VALUES (10,3,5);
INSERT INTO sales_products (id_product, id_sales, amount) VALUES (11,3,1);
INSERT INTO sales_products (id_product, id_sales, amount) VALUES (15,3,2);

--Actualizamos el Stock 
UPDATE stock SET amount = (amount - 5) WHERE id_product= 10;
UPDATE stock SET amount = (amount - 1) WHERE id_product= 11;
UPDATE stock SET amount = (amount - 2) WHERE id_product= 15;


--Tabla para Login 
CREATE TABLE users(
	id BIGSERIAL NOT NULL PRIMARY KEY,
	name VARCHAR (100) NOT NULL,
	lastName VARCHAR (100) NOT NULL,
	ci VARCHAR (10) NOT NULL,
	mail VARCHAR (150) NOT NULL,
	password VARCHAR (100) NOT NULL
)

INSERT INTO users (name, lastName, ci, mail, password) 
			VALUES ('Agustín', 'Cajal', '1234567', 'acajal@mail.com', '$2b$10$f/rpZSwm2YX7sQECj/6eduVGa58jRWGifgAfvsJWjlb1.8W3a5gYa');


