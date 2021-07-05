import { useEffect, useState } from 'react';
import axios from 'axios';
import BookingView from './BookingView';
import { Link } from 'react-router-dom';

const BookingsView = ({ URL, history }) => {
	const [bookings, setBookings] = useState(null);

	const getBookings = async () => {
		try {
			const response = await axios.get(`${URL}/bookings`);
			setBookings(response.data.bookings);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getBookings();
	}, []);

	const loaded = () => {
		return bookings.map((booking) => (
			<BookingView key={booking._id} booking={booking} URL={URL} />
		));
	};
	return (
		<div>
			<h1>Bookings</h1>
			{bookings ? loaded() : <p>Loading...</p>}
		</div>
	);
};

export default BookingsView;