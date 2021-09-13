import React, { useState } from 'react';
import './Product.css';

const Product = (props) => {
	const { id, name, price, imageUrl } = props;

	console.log(imageUrl);

	return (
		<div>
			<img src={imageUrl} alt="imagen de producto" />
			{id}
			<p>{name}</p>
			<p>{price}</p>
		</div>
	);
};

export default Product;
