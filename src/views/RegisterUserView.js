import axios from 'axios';
import { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Link } from 'react-router-dom';
import { FormGroup, Label, Input, Button, Col, Alert } from 'reactstrap';

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
			<h1 className="mb-1">Register</h1>
			{message && <Alert color="danger">{message}</Alert>}
			<form onSubmit={handleSubmit}>
				<FormGroup row>
					<Label md={2}>Name: </Label>
					<Col md={10}>
						<Input
							type="text"
							name="name"
							placeholder="Enter name"
							value={newUser.name}
							onChange={handleChange}
						/>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label md={2}>Email: </Label>
					<Col md={10}>
						<Input
							type="text"
							name="email"
							placeholder="Enter email"
							value={newUser.email}
							onChange={handleChange}
						/>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label md={2}>Password: </Label>
					<Col md={10}>
						<Input
							type="text"
							name="password"
							placeholder="Enter new password"
							value={newUser.password}
							onChange={handleChange}
						/>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label md={2}>Confirm Password: </Label>
					<Col md={10}>
						<Input
							type="text"
							name="confirmPassword"
							placeholder="Confirm password"
							value={newUser.confirmPassword}
							onChange={handleChange}
						/>
					</Col>
				</FormGroup>
				<Button type="submit" color="primary" className="  my-2 ">
					Submit
				</Button>
			</form>
			<p>
				Already registered? Login <Link to="/users/login">here!</Link>
			</p>
		</div>
	);
};

export default RegisterUserView;
