import axios from 'axios';
import React, { useEffect, useState } from 'react';

const BookingView = ({ booking, URL }) => {
	const [bookingDetails, setBookingDetails] = useState({});

	useEffect(() => {
		if (booking._id) {
			setBookingDetails({});
		}
	}, []);

	const updateBooking = async () => {
		try {
			const response = await axios.put(
				`${URL}/users/${bookingDetails.id}`,
				bookingDetails,
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
		updateBooking();
	};
	return (
		<div>
			<h2>{bookingDetails.name}</h2>
			<form onSubmit={handleSubmit}>
				<input type="submit" value="Update Booking" />
			</form>
		</div>
	);
};

export default BookingView;
