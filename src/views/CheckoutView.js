import { useState } from 'react';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CheckoutView = ({ URL, history }) => {
	const { userInfo, cart } = useContext(GlobalContext);
	const [message, setMessage] = useState('');
	const totalPrice = cart.reduce(
		(acc, item) => acc + item.pack.price * item.guestNumber,
		0
	);

	useEffect(() => {
		if (!userInfo._id || cart.length < 1) {
			history.push('/users/login');
		}
	}, []);

	const handleBooking = async () => {
		const bookingItems = cart.map((item) => {
			return {
				guestNumber: item.guestNumber,
				date: item.date,
				package: item.pack._id,
				title: item.pack.title,
				price: item.pack.price,
				image: item.pack.image,
			};
		});
		const response = await axios.post(
			`${URL}/bookings`,
			{ user: userInfo._id, totalPrice, bookingItems },
			{
				headers: {
					'Content-Type': 'Application/json',
				},
			}
		);
		setMessage(response.data.message);
	};

	const loaded = () => {
		return cart.map((item) => (
			<div key={item.pack._id}>
				<h2>{item.pack.title}</h2>
				<p>${item.pack.price}</p>
				<p>Date: {item.date}</p>
				<p>Number of travellers: {item.guestNumber}</p>
			</div>
		));
	};

	return (
		<div>
			<h1>Checkout</h1>
			<p>Your Total: ${totalPrice}</p>
			{cart ? loaded() : <p>Loading...</p>}
			<p>
				Need to update something? <Link to="/cart">Back to Cart</Link>
			</p>
			<button onClick={handleBooking}>Book</button>
			{message && (
				<p>
					{message} <Link to="/">View booking</Link>
				</p>
			)}
		</div>
	);
};

export default CheckoutView;
