import React, { Component } from 'react';
import './DinamicHeader.css';
import Slider from 'react-slick';

class PauseOnHover extends Component {
	render() {
		var settings = {
			dots: true,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 2000,
			pauseOnHover: true
		};

		return (
			<header>
				<Slider {...settings}>
					<div className="slide-container">
						<img src="/imagenes/mix.png" />
					</div>

					<div className="slide-container">
						<img src="/imagenes/mix2.png" />
					</div>

					<div className="slide-container">
						<img src="/imagenes/menu.png" />
					</div>

					<div className="slide-container">
						<img src="/imagenes/bolsa.png" />
					</div>
				</Slider>
			</header>
		);
	}
}
export default PauseOnHover;
