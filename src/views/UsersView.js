import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UsersView = ({ URL, history }) => {
	const [users, setUsers] = useState(null);

	const getUsers = async () => {
		try {
			console.log(URL);
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
				<Link to={`users/${user._id}`}>
					<h2>{user.name}</h2>
				</Link>
				{user.isAdmin && <p>(Admin)</p>}
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
