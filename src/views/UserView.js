import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, FormGroup, Input, Label, ListGroupItem } from 'reactstrap';

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
		<ListGroupItem className="p-3">
			<h2 className="mb-2 mt-0">
				{userDetails.name} {showAdmin && '(Admin)'}
			</h2>
			<form onSubmit={handleSubmit}>
				<FormGroup check>
					<Label check>
						<Input
							className="form-check-input"
							type="checkbox"
							checked={userDetails.isAdmin}
							onChange={(e) => {
								setUserDetails((prevState) => {
									return { ...prevState, isAdmin: !userDetails.isAdmin };
								});
							}}
						/>{' '}
						Admin
						<span className="form-check-sign">
							<span className="check"></span>
						</span>
					</Label>
				</FormGroup>
				<Button className="mt-2" color="info" type="submit">
					Update User
				</Button>
			</form>
		</ListGroupItem>
	);
};

export default UserView;
