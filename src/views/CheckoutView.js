import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Link } from 'react-router-dom';

const CheckoutView = ({ history }) => {
	const { userInfo, cart } = useContext(GlobalContext);
	const totalPrice = cart.reduce(
		(acc, item) => acc + item.pack.price * item.guestNumber,
		0
	);

	useEffect(() => {
		if (!userInfo._id || cart.length < 1) {
			history.push('/users/login');
		}
	}, []);

	const handleBooking = async () => {};

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
			{cart ? loaded() : <p>Loading...</p>}
			<p>
				Need to update something? <Link to="/cart">Back to Cart</Link>
			</p>
			<button onClick={handleBooking}>Book</button>
		</div>
	);
};

export default CheckoutView;
