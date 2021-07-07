import axios from 'axios';
import { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Link } from 'react-router-dom';

const RegisterUserView = ({ URL, history }) => {
	const { checkForToken } = useContext(GlobalContext);
	const [newUser, setNewUser] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [message, setMessage] = useState('');

	const registerUser = async () => {
		try {
			if (
				!newUser.name ||
				!newUser.email ||
				!newUser.password ||
				!newUser.confirmPassword
			) {
				setMessage('Please Enter all required fields!');
			} else {
				if (newUser.password !== newUser.confirmPassword) {
					setMessage('Please confirm password!');
				} else {
					const response = await axios.post(
						`${URL}/users`,
						{
							name: newUser.name,
							email: newUser.email,
							password: newUser.password,
						},
						{
							headers: {
								'Content-Type': 'Application/json',
							},
						}
					);
					if (response.data.token) {
						localStorage.setItem('token', response.data.token);
						checkForToken();
						history.push('/');
					} else {
						setMessage(response.data.message);
					}
				}
			}
		} catch (err) {
			console.log(err);
			registerUser();
		}
	};

	const handleChange = (e) => {
		setNewUser((prevState) => {
			return { ...prevState, [e.target.name]: e.target.value };
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		registerUser();
		setNewUser({
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		});
	};

	return (
		<div>
			<h1>Register</h1>
			{message && <p>{message}</p>}
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="name"
					placeholder="name"
					value={newUser.name}
					onChange={handleChange}
				/>
				<input
					type="text"
					name="email"
					placeholder="email"
					value={newUser.email}
					onChange={handleChange}
				/>
				<input
					type="text"
					name="password"
					placeholder="password"
					value={newUser.password}
					onChange={handleChange}
				/>
				<input
					type="text"
					name="confirmPassword"
					placeholder="confirm password"
					value={newUser.confirmPassword}
					onChange={handleChange}
				/>
				<input type="submit" value="submit" />
			</form>
			<p>
				Already registered? Login <Link to="/users/login">here!</Link>
			</p>
		</div>
	);
};

export default RegisterUserView;
