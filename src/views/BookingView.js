import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Button, FormGroup, Label, ListGroupItem } from 'reactstrap';

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
		<ListGroupItem className="p-3">
			<h2 className="mb-2 mt-0">{bookingDetails.name}</h2>
			{bookingDetails.bookings &&
				bookingDetails.bookings.map((bookingItem) => (
					<div key={bookingItem._id}>
						<p>
							{bookingItem.title} on {bookingItem.date.split('T')[0]}
						</p>
					</div>
				))}
			<form onSubmit={handleSubmit}>
				<FormGroup check>
					<Label check>
						Booking paid
						<input
							type="checkbox"
							checked={bookingDetails.isPaid}
							className="form-check-input"
							onChange={(e) => {
								setBookingDetails((prevState) => {
									return { ...prevState, isPaid: !bookingDetails.isPaid };
								});
							}}
						/>
						<span className="form-check-sign">
							<span className="check"></span>
						</span>
					</Label>
				</FormGroup>
				<FormGroup check>
					<Label check>
						Booking complete
						<input
							type="checkbox"
							checked={bookingDetails.isComplete}
							className="form-check-input"
							onChange={(e) => {
								setBookingDetails((prevState) => {
									return {
										...prevState,
										isComplete: !bookingDetails.isComplete,
									};
								});
							}}
						/>
						<span className="form-check-sign">
							<span className="check"></span>
						</span>
					</Label>
				</FormGroup>
				<Button color="info" type="submit">
					Update Booking
				</Button>
			</form>
			{message && (
				<Alert className="my-2" color="success">
					{message}
				</Alert>
			)}
		</ListGroupItem>
	);
};

export default BookingView;
