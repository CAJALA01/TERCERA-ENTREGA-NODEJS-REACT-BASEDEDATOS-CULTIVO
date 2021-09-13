import React, { useState } from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

//chequear icono cookie font awesome

const Footer = () => {
	return (
		<footer className="footer">
			<div>
				<Link
					to={{ pathname: 'https://www.instagram.com/cultivomasamadre/' }}
					target="_blank"
					className="footbutton"
				>
					<i className="fa fa-instagram" />
					Cultivomasamadre{' '}
				</Link>

				<Link to="tel:+598111557" className="footbutton">
					<i className="fa fa-whatsapp" />
					098111557{' '}
				</Link>

				<Link to="/Login" className="footbutton">
					<i className="fa fa-id-badge" />
					Login{' '}
				</Link>
			</div>
			<div>
				<p> © Copyright 2021</p>
				<p> Desarrollado por Agustin Cajal 🦾</p>
			</div>
		</footer>
	);
};

export default Footer;
