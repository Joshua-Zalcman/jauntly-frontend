import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const CartView = () => {
	const { cart, userInfo, removeFromCart } = useContext(GlobalContext);

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
						removeFromCart(item._id);
					}}>
					Remove Item
				</button>
			</div>
		));
	};
	return (
		<div>
			<h1>Your Cart</h1>
			{cart.length > 0 ? loaded() : <p>Your Cart is empty</p>}
			<button>Checkout</button>
		</div>
	);
};

export default CartView;
