import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import axios from 'axios';
import { getToken } from '../actions/token_actions';

const MyBookingsView = ({ URL, history }) => {
	const { userInfo } = useContext(GlobalContext);
	const [bookings, setBookings] = useState(null);
	useEffect(() => {
		const user = getToken();
		if (userInfo._id) {
			getBookings(userInfo._id);
		} else if (user && user._id) {
			getBookings(user._id);
		} else {
			history.push('/users/login');
		}
	}, []);

	const getBookings = async (id) => {
		const response = await axios.get(`${URL}/bookings/${id}`);
		setBookings(response.data.bookings);
	};

	const loaded = () => {
		return bookings.map((booking, index) => (
			<div key={booking._id}>
				<h3>Booking {index + 1}</h3>
				{booking.bookingItems.map((pack, index) => (
					<div key={pack._id}>
						<h5>Package {index + 1}</h5>
						<p>{pack.title}</p>
						<p>Number of travellers: {pack.guestNumber}</p>
						<p>Date: {pack.date.split('T')[0]}</p>
					</div>
				))}
			</div>
		));
	};

	return (
		<div>
			<h1>Your Bookings</h1>
			{bookings && bookings.length > 0 ? loaded() : <p>You have no bookings</p>}
		</div>
	);
};

export default MyBookingsView;
