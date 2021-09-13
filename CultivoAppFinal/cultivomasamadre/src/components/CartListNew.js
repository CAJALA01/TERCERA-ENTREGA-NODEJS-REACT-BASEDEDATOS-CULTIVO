import React, { useEffect, useState } from 'react';
import './CartListNew.css';
import Product from './Product';

const CartList = () => {
	const [ cartElements, setCartElements ] = useState([]);

	useEffect(() => {
		const items = localStorage.getItem('cart-cultivo');
		setCartElements(items ? JSON.parse(items) : []);
	}, []);

	const handleBuy = async () => {
		// Enviar datos por POST al backend. Sacar datos de
		// cartElements.

		const response = await fetch(
			//Enviar Nombre del Cliente a Backend a traves del input box de Completar nombre
			'http://localhost:4000/products/buy',
			{
				method: 'POST'
			},
			{ ...cartElements, name_client: 'Prueba' }
		);
	};

	return (
		<main>
			<section>
				<div className="container cart-column">
					<div className="loginbox">
						<input placeholder="Ingrese su Nombre Completo" onChange={''} />
					</div>
					<div>
						<div className="cart-quantity">
							<input className="cart-quantity-input" type="number" min="1" value="1" />
							<button className="buttonRemove">BORRAR</button>
						</div>
						{cartElements.map((product) => (
							<Product
								key={product.id}
								name={product.name}
								imageUrl={product.imageurl}
								price={'$' + product.price}
							/>
						))}
					</div>

					<div className="cart-total">
						<strong className="cart-total-title">Total</strong>
						<span className="cart-total-price" />
					</div>
					<button className="buttonPurchase purchaseanimated" onClick={handleBuy}>
						COMPRAR
					</button>
				</div>
			</section>
		</main>
	);
};

export default CartList;
