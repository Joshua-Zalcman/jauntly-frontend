import { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Link } from 'react-router-dom';
import axios from 'axios';

const LoginView = ({ URL, history }) => {
	const { checkForToken } = useContext(GlobalContext);
	const [message, setMessage] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const loginUser = async (email, password) => {
		try {
			const response = await axios.post(
				`${URL}/users/login`,
				{ email, password },
				{
					headers: {
						'Content-Type': 'Application/json',
					},
				}
			);
			if (response.data.token) {
				localStorage.setItem('token', response.data.token);
				checkForToken();
				history.push('/packages');
			} else {
				setMessage(response.data.message);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		loginUser(email, password);
	};

	return (
		<section>
			<h1>Login</h1>
			{message && <p>{message}</p>}
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="name"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<input type="submit" value="Login" />
			</form>
			<p>
				New? Sign up <Link to="/users/register">here!</Link>
			</p>
		</section>
	);
};

export default LoginView;
