import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Products from './components/ProductList';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import PauseOnHover from './components/DinamicHeader';
import ProductsHome from './components/HomePage';
import Login from './components/Login';
import CartList from './components/CartListNew';

function App() {
	return (
		<Router>
			<div className="App">
				<Navigation />
				<Switch>
					<Route exact path="/">
						<PauseOnHover />
						<ProductsHome />
					</Route>
				</Switch>
				<Switch>
					<Route exact path="/products">
						<Products />
					</Route>
				</Switch>
				<Switch>
					<Route exact path="/Login">
						<Login />
					</Route>
				</Switch>
				<Switch>
					<Route exact path="/CartListNew">
						<CartList />
					</Route>
				</Switch>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
