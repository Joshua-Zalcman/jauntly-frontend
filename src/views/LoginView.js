import { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FormGroup, Label, Input, Button, Col, Alert } from 'reactstrap';

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
			<h1 className="mb-1">Login</h1>
			{message && <Alert color="danger">{message}</Alert>}
			<form onSubmit={handleSubmit}>
				<FormGroup row>
					<Label md={2}>Email: </Label>
					<Col md={10}>
						<Input
							type="text"
							placeholder="Enter Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Col>
				</FormGroup>
				<FormGroup row>
					<Label md={2}>Password: </Label>
					<Col md={10}>
						<Input
							type="password"
							value={password}
							placeholder="Enter Password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Col>
				</FormGroup>
				<Button type="submit" className="  my-2 " color="primary">
					Login
				</Button>
			</form>
			<p>
				New? Sign up <Link to="/users/register">here!</Link>
			</p>
		</section>
	);
};

export default LoginView;
