import axios from 'axios';
import React, { useEffect, useState } from 'react';

const BookingView = ({ booking, URL, refreshInfo }) => {
	const [message, setMessage] = useState('');
	const [bookingDetails, setBookingDetails] = useState({
		name: '',
		isPaid: '',
		isComplete: '',
		bookings: '',
		totalPrice: '',
		user: '',
		id: '',
	});

	useEffect(() => {
		if (booking._id) {
			setBookingDetails({
				name: booking.name,
				isPaid: booking.isPaid,
				isComplete: booking.isComplete,
				bookings: booking.bookingItems,
				totalPrice: booking.totalPrice,
				user: booking.user,
				id: booking._id,
			});
		}
	}, [refreshInfo]);

	const updateBooking = async () => {
		try {
			const response = await axios.put(
				`${URL}/bookings/${bookingDetails.id}`,
				bookingDetails,
				{
					headers: {
						'Content-Type': 'Application/json',
					},
				}
			);
			setMessage(response.data.message);
		} catch (err) {
			console.log(err);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		updateBooking();
		refreshInfo();
	};

	return (
		<div>
			<h2>{bookingDetails.name}</h2>
			{bookingDetails.bookings &&
				bookingDetails.bookings.map((bookingItem) => (
					<div key={bookingItem._id}>
						<p>
							{bookingItem.title} on {bookingItem.date.split('T')[0]}
						</p>
					</div>
				))}
			<form onSubmit={handleSubmit}>
				<label>
					Booking paid:
					<input
						type="checkbox"
						checked={bookingDetails.isPaid}
						onChange={(e) => {
							setBookingDetails((prevState) => {
								return { ...prevState, isPaid: !bookingDetails.isPaid };
							});
						}}
					/>
				</label>
				<label>
					Booking complete:
					<input
						type="checkbox"
						checked={bookingDetails.isComplete}
						onChange={(e) => {
							setBookingDetails((prevState) => {
								return { ...prevState, isComplete: !bookingDetails.isComplete };
							});
						}}
					/>
				</label>
				<input type="submit" value="Update Booking" />
			</form>
			{message && <p>{message}</p>}
		</div>
	);
};

export default BookingView;
