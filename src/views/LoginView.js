import { useState } from 'react';
import axios from 'axios';

const LoginView = ({ URL, history }) => {
	const [message, setMessage] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const loginUser = async (email, password) => {
		const response = await axios.post(
			`${URL}/users/login`,
			{ email, password },
			{
				headers: {
					'Content-Type': 'Application/json',
				},
			}
		);
		console.log(response);
		if (response.data.token) {
			localStorage.setItem('token', response.data.token);
			//context function
			history.push('/packages');
		} else {
			setMessage(response.data.message);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('login');
		loginUser(email, password);
	};

	return (
		<section>
			<h1>Login</h1>
			{message && <p>{message}</p>}
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="text"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<input type="submit" value="Login" />
			</form>
		</section>
	);
};

export default LoginView;
