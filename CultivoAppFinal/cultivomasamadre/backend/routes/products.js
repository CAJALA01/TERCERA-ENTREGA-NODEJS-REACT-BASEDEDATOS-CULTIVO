const express = require('express');
const router = express.Router();
const database = require('../database');

// LISTA DE PRODUCTOS - OBTENER

router.get('/', async (request, response) => {
	try {
		let productsDatabase = await database.query(
			'SELECT id, name, price, imageurl FROM products WHERE deleted = false',
			[]
		);
		if (productsDatabase.rowCount > 0) {
			return response.send({
				message: 'Products read correctly',
				products: productsDatabase.rows
			});
		} else {
			return response.send({
				message: 'No Products in the database',
				products: []
			});
		}
	} catch (ex) {
		console.log(ex);
		return response.send({ error: ex });
	}
});

// LISTA DE PRODUCTOS - AGREGAR UN PRODUCTO

router.post('/', async (request, response) => {
	// Try Catch de Product name , price , imageurl
	try {
		if (!request.body.name) {
			return response.send({ error: 'No name provided' });
		}

		const name = request.body.name;

		let productByNameDatabase = await database.query('SELECT * FROM products WHERE name = $1 AND deleted = false', [
			name
		]);
		if (productByNameDatabase.rowCount > 0) {
			return response.send({ error: 'Name duplicated' });
		}

		if (!request.body.price) {
			return response.send({ error: 'No price provided' });
		}

		const price = request.body.price;

		if (!request.body.imageurl) {
			return response.send({ error: 'No image provided' });
		}

		const imageurl = request.body.imageurl;

		await database.query('INSERT INTO products(name, price, imageurl) VALUES ($1, $2, $3)', [
			name,
			price,
			imageurl
		]);

		productByDatabase = await database.query('SELECT * FROM products WHERE name = $1 AND deleted = false', [
			name
		]);
		if (productByDatabase.rowCount === 1) {
			return response.send({
				newProductName: productByDatabase.rows[1],
				newProductPrice: productByDatabase.rows[3],
				newProductImage: productByDatabase.rows[4]
			});
		} else {
			response.send({
				message: 'Product not found after insert/adding into the Database in products table'
			});
		}
	} catch (ex) {
		return response.send({ error: ex });
	}
});

// BORRAR UN PRODUCTO
router.delete('/:productId', async (request, response) => {
	try {
		if (!request.params.productId) {
			return response.send({ error: 'No id provided' });
		}

		const idToDelete = request.params.productId;

		let productDeletedDatabase = await database.query('SELECT * FROM products WHERE id = $1 AND deleted = false', [
			idToDelete
		]);
		if (productDeletedDatabase.rowCount === 0) {
			return response.send({
				message: 'No product found with that id'
			});
		}

		await database.query('UPDATE products SET deleted = true WHERE id = $1', [ idToDelete ]);

		productDeletedDatabase = await database.query('SELECT * FROM products WHERE id = $1 AND deleted = true', [
			idToDelete
		]);
		if (productDeletedDatabase.rowCount === 1) {
			return response.send({
				message: 'Product deleted correctly'
			});
		}

		return response.send({
			message: 'Product not deleted after update'
		});
	} catch (ex) {
		return response.send({ error: ex });
	}
});

// ACTUALIZAR UN PRODUCTO CON NOMBRE , PRECIO E IMAGEN NUEVO ( tanto para Nombre como para Precio como para Imagen)

router.put('/:productId', async (request, response) => {
	try {
		if (!request.params.productId) {
			return response.send({ error: 'No id provided' });
		}

		if (!request.body.name) {
			return response.send({ error: 'No name provided' });
		}

		if (!request.body.price) {
			return response.send({ error: 'No price provided' });
		}

		if (!request.body.imageurl) {
			return response.send({ error: 'No image provided' });
		}

		const name = request.body.name;
		const idToUpdate = request.params.productId;
		const price = request.body.price;
		const imageurl = request.body.imageurl;

		let productUpdateDatabase = await database.query('SELECT * FROM products WHERE id = $1 AND deleted = false', [
			idToUpdate
		]);
		if (productUpdateDatabase.rowCount === 0) {
			return response.send({
				message: 'No Product found with that id'
			});
		}

		await database.query('UPDATE products SET name = $1, price = $2, imageurl = $3 WHERE id = $4', [
			name,
			price,
			imageurl,
			idToUpdate
		]);

		productUpdateDatabase = await database.query('SELECT * FROM products WHERE id = $1 AND deleted = false', [
			idToUpdate
		]);
		if (productUpdateDatabase.rowCount === 1) {
			return response.send({
				message: 'Product updated correctly',
				product: productUpdateDatabase.rows[0]
			});
		}

		return response.send({
			message: 'Product not updated after update'
		});
	} catch (ex) {
		return response.send({ error: ex });
	}
});

router.post('/buy', async (request, response) => {
	// Parsear los datos que vienen del frontend y crear las ventas.
	// Recibe un array, por ejemplo request.body.products, de objetos
	// [{ id: 1, name: 'Pan de campo', price: 80, imageurl: '...'}, ...]

	// Obtener precio total.
	precioTotal = products.reduce((acc, product) => acc + product.price, 0);

	// Crear venta.
	idVenta = crearVentaEnTablaSales(nombre_cliente, adenda, fecha, precioTotal);

	// Insertar productos en venta.
	(paraCadaProducto) => {
		contarCantidad;
		insertarFila(idVenta, idProducto);
		actualizarStockProducto;
	};
});

module.exports = {
	router: router
};
