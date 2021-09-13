import React from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

const ProductsHome = () => {
	return (
		<section>
			<h2> Nuestros Productos </h2>
			<div className="polaroid">
				<div className="polaroidstyle">
					<Link to="/products">
						<img src="./imagenes/panCampo.png" alt="pan de campo" />
						<div className="polaroidtext">
							<p>Panes</p>
						</div>
					</Link>
				</div>

				<div className="polaroidstyle">
					<Link to="/products">
						<img src="./imagenes/focaccia.png" alt="focaccia" />
						<div className="polaroidtext">
							<p>Focaccias</p>
						</div>
					</Link>
				</div>

				<div className="polaroidstyle">
					<Link to="/products">
						<img src="./imagenes/bolleria.png" alt="bolleria" />
						<div className="polaroidtext">
							<p>Bolleria</p>
						</div>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default ProductsHome;
