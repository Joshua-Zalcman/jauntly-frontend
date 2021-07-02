import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { setCartLocalStorage } from '../actions/cart_actions';

const CartView = ({ history }) => {
	const { cart, removeFromCart, userInfo } = useContext(GlobalContext);

	//useEffect to check for cart in local storage
	useEffect(() => {
		setCartLocalStorage(cart);
	}, [cart]);

	const totalPrice = cart.reduce(
		(acc, item) => acc + item.pack.price * item.guestNumber,
		0
	);

	const loaded = () => {
		return cart.map((item) => (
			<div key={item.pack._id}>
				<h2>{item.pack.title}</h2>
				<img src={item.pack.image} alt={item.pack.title} />
				<p>{item.pack.description}</p>
				<p>${item.pack.price}</p>
				{/* allow for updates here with form */}
				<p>Date: {item.date}</p>
				<p>Number of travellers: {item.guestNumber}</p>
				<button
					onClick={() => {
						removeFromCart(item.pack._id);
					}}>
					Remove Item
				</button>
			</div>
		));
	};

	const handleCheckout = () => {
		if (!userInfo) {
			history.push('/users/login');
		} else {
			history.push('/users/checkout');
		}
	};

	return (
		<div>
			<h1>Your Cart</h1>
			{cart.length > 0 ? loaded() : <p>Your Cart is empty</p>}
			<p>Your total: ${totalPrice}</p>
			<button
				onClick={handleCheckout}
				disabled={cart.length < 1 ? true : false}>
				Checkout
			</button>
		</div>
	);
};

export default CartView;
