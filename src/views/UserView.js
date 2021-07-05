import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UserView = ({ user, URL, refreshInfo }) => {
	const [showAdmin, setShowAdmin] = useState(false);
	const [userDetails, setUserDetails] = useState({
		id: '',
		name: '',
		email: '',
		password: '',
		isAdmin: '',
	});

	useEffect(() => {
		if (user._id) {
			setUserDetails({
				id: user._id,
				name: user.name,
				email: user.email,
				password: user.password,
				isAdmin: user.isAdmin,
			});
		}
		if (user.isAdmin) {
			setShowAdmin(true);
		} else {
			setShowAdmin(false);
		}
	}, [refreshInfo]);

	const updateUser = async () => {
		try {
			const response = await axios.put(
				`${URL}/users/${userDetails.id}`,
				userDetails,
				{
					headers: {
						'Content-Type': 'Application/json',
					},
				}
			);
		} catch (err) {
			console.log(err);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		updateUser();
		refreshInfo();
	};

	return (
		<div>
			<h2>
				{userDetails.name} {showAdmin && '(Admin)'}
			</h2>
			<form onSubmit={handleSubmit}>
				<label>Admin: </label>
				<input
					type="checkbox"
					checked={userDetails.isAdmin}
					onChange={(e) => {
						setUserDetails((prevState) => {
							return { ...prevState, isAdmin: !userDetails.isAdmin };
						});
					}}
				/>
				<input type="submit" value="Update User" />
			</form>
		</div>
	);
};

export default UserView;
