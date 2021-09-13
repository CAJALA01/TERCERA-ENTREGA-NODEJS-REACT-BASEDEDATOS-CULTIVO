import React, { useState, useEffect } from 'react';
import './Product.css';
import Product from './Product';

const Products = () => {
	const [ products, setProducts ] = useState([]);

	useEffect(() => {
		loadData();
	}, []);

	const loadData = async () => {
		const response = await fetch('http://localhost:4000/products', {
			method: 'GET'
		});
		const data = await response.json();
		setProducts(data.products);
	};

	const addToCart = (product) => {
		// Obtenemos la lista actual de la memoria, si existe.
		let items = [];
		if (localStorage.getItem('cart-cultivo')) {
			// JSON.parse convierte un string a un objeto.
			items = JSON.parse(localStorage.getItem('cart-cultivo'));
		}

		// Agregamos el ítem a la lista guardada.
		items.push(product);

		// Actualizamos la lista en memoria. LocalStorage solo acepta
		// strings como valor.
		localStorage.setItem('cart-cultivo', JSON.stringify(items));
	};

	return (
		<section>
			<div className="polaroid galeria-animado">
				{products.map((product) => (
					<div className="polaroidstyle polaroidtext">
						<Product
							key={product.id}
							name={product.name}
							imageUrl={product.imageurl}
							price={'$' + product.price}
						/>

						<div className="divCart">
							<button onClick={addToCart(product)} className="buttonAddtocart">
								<i className="fa fa-cart-plus" />
								Agregar
							</button>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default Products;
