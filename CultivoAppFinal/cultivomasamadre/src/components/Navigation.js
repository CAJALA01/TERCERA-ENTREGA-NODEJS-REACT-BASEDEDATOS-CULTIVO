import React, { useState } from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';

const Navigation = () => {
	return (
		<nav className="nav">
			<img src={process.env.PUBLIC_URL + '/imagenes/LOGOBLANCO.png'} />
			<div>
				<Link to="/" className="buttonNav">
					<i className="fa fa-home" />
					Inicio{' '}
				</Link>

				<Link to="/products" className="buttonNav">
					<i className="fa fa-cookie-bite" />
					Productos{' '}
				</Link>

				<Link to="/CartListNew" className="buttonNav">
					<i className="fa fa-shopping-cart" />
					Carrito{' '}
				</Link>
			</div>
		</nav>
	);
};

export default Navigation;
