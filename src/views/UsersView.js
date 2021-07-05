import { useEffect, useState } from 'react';
import axios from 'axios';
import UserView from './UserView';
import { Link } from 'react-router-dom';

const UsersView = ({ URL, history }) => {
	const [users, setUsers] = useState(null);

	const getUsers = async () => {
		try {
			const response = await axios.get(`${URL}/users`);
			setUsers(response.data.users);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getUsers();
	}, []);

	const loaded = () => {
		return users.map((user) => (
			<UserView key={user._id} user={user} URL={URL} />
		));
	};
	return (
		<div>
			<h1>Users</h1>
			{users ? loaded() : <p>Loading...</p>}
		</div>
	);
};

export default UsersView;
