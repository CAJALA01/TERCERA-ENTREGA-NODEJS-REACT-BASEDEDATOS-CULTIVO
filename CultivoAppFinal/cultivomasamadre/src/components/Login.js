import React, { useState } from 'react';
import './Login.css';

const Login = (props) => {
	const [ mail, setMail ] = useState('');
	const [ pasword, setPassword ] = useState('');
	const [ error, setError ] = useState('');

	const handleMailChange = (event) => {
		setMail(event.target.value);
	};

	const handleLoginClick = () => {
		if (mail.length === 0) {
			alert('Debe completar el mail');
			return;
		}

		if (pasword.length === 0) {
			alert('Debe completar la contraseña');
			return;
		}

		fetch('http://localhost:4000/auth/Login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ mail: mail, password: pasword })
		})
			.then((res) => {
				return res.json();
			})
			.then((respuesta) => {
				console.log(respuesta);
				if (respuesta.error) {
					setError(respuesta.error);
				} else {
					// Navegar a la ruta correspondiente
					alert('Login exitoso');
					props.onLogin(respuesta.token);
				}
			});
	};

	return (
		<main>
			<div>
				<h1>Login</h1>
				<div className="loginbox">
					<input placeholder="Ingrese su correo" onChange={handleMailChange} />
					<input
						placeholder="Ingrese su contraseña"
						onChange={(event) => setPassword(event.target.value)}
						type="password"
					/>
					<button onClick={handleLoginClick}> Login </button>
				</div>
			</div>
		</main>
	);
};

export default Login;
