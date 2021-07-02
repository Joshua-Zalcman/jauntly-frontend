import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import axios from 'axios';

const BookingsView = ({ URL }) => {
	const { userInfo } = useContext(GlobalContext);
	const [bookings, setBookings] = useState([]);
	useEffect(() => {
		getBookings();
	}, []);

	const getBookings = async () => {
		const response = await axios.get(`${URL}/bookings/${userInfo._id}`);
		setBookings(response.data);
	};

	return (
		<div>
			<h1>Your Bookings</h1>
			{bookings.length > 0 && loaded()}
		</div>
	);
};

export default BookingsView;
