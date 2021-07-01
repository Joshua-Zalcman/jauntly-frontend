import { useEffect, useState } from 'react';
import axios from 'axios';

const UsersView = ({ URL }) => {
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
			<div key={user._id}>
				<h2>{user.name}</h2>
			</div>
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
