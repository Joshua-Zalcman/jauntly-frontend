import { useState } from 'react';
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
	Card,
	CardImg,
	CardBody,
	CardTitle,
	CardText,
	Button,
	Alert,
} from 'reactstrap';

const CheckoutView = ({ URL, history }) => {
	const { userInfo, cart, emptyCart } = useContext(GlobalContext);
	const [message, setMessage] = useState('');
	const [booking, setBooking] = useState('');
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
			{ user: userInfo._id, name: userInfo.name, totalPrice, bookingItems },
			{
				headers: {
					'Content-Type': 'Application/json',
				},
			}
		);
		setMessage(response.data.message);
		setBooking(response.data.booking);
		emptyCart();
	};

	const loaded = () => {
		return cart.map((item) => (
			<Card key={item.pack._id}>
				<CardBody>
					<h2 className="mt-0">{item.pack.title}</h2>
					<p>${item.pack.price * item.guestNumber}</p>
					<p>Date: {item.date}</p>
					<p>Number of travellers: {item.guestNumber}</p>
				</CardBody>
			</Card>
		));
	};

	return (
		<div>
			<h1>Checkout</h1>
			<h4>Your Total: ${totalPrice}</h4>
			<div className="d-flex flex-wrap mt-4 justify-content-between">
				{cart ? loaded() : <p>Loading...</p>}
			</div>

			<h5>
				Need to update something? <Link to="/cart">Back to Cart</Link>
			</h5>
			<Button color="primary" onClick={handleBooking}>
				Book
			</Button>
			{message && (
				<Alert color="success">
					{message} <Link to={`/bookings/${booking._id}`}>View booking</Link>
				</Alert>
			)}
		</div>
	);
};

export default CheckoutView;
