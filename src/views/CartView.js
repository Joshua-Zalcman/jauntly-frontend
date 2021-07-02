import { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const CartView = () => {
	const { cart } = useContext(GlobalContext);

	const loaded = () => {
		return cart.map((item) => (
			<div key={item._id}>
				<h2>{item.title}</h2>
				<img src={item.image} alt={item.title} />
				<p>{item.description}</p>
				<p>${item.price}</p>
				<button>Remove Item</button>
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
