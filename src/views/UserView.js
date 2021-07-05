import React, { useState } from 'react';

const UserView = ({ user }) => {
	const [userDetails, setUserDetails] = useState({
		id: user._id,
		name: user.name,
		email: user.email,
		password: user.password,
		isAdmin: user.isAdmin,
	});

	const handleSubmit = (e) => {
		e.preventDefault();
	};
	return (
		<div>
			<h2>{user.name}</h2>
			<form onSubmit={handleSubmit}>
				<label>Admin: </label>
				<input
					type="checkbox"
					checked={user.isAdmin}
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
