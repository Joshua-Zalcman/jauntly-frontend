import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { setCartLocalStorage } from '../actions/cart_actions';
import {
	Alert,
	Button,
	Card,
	CardBody,
	CardImg,
	CardText,
	CardTitle,
	Container,
} from 'reactstrap';

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
			<Card key={item.pack._id} className="mx-auto" style={{ width: '20rem' }}>
				<CardImg top src={item.pack.image} alt={item.pack.title} />
				<CardBody>
					<h2 className="my-1">{item.pack.title}</h2>
					<CardText>
						<p>{item.pack.description}</p>
					</CardText>
					<p>
						<strong>Date:</strong> {item.date}
					</p>
					<p>
						<strong>Number of travellers:</strong> {item.guestNumber}
					</p>
					<h3>
						<strong>Price:</strong> ${item.pack.price}
					</h3>
				</CardBody>
				<Button
					color="danger"
					className="mx-2"
					onClick={() => {
						removeFromCart(item.pack._id);
					}}>
					Remove Item
				</Button>
			</Card>
		));
	};

	const handleCheckout = () => {
		if (!userInfo) {
			history.push('/users/login');
		} else {
			history.push('/checkout');
		}
	};

	return (
		<Container>
			<h1 className="mb-3">Your Cart:</h1>
			<div className="d-flex flex-wrap justify-content-between">
				{cart.length > 0 ? (
					loaded()
				) : (
					<Alert color="warning" className="mb-5">
						Your Cart is empty
					</Alert>
				)}
			</div>

			<h2 className="my-2 text-center">Your total: ${totalPrice}</h2>
			<Button
				color="primary"
				className="my-2 mx-auto  d-block"
				style={{ width: '20rem' }}
				onClick={handleCheckout}
				disabled={cart.length < 1 ? true : false}>
				Checkout
			</Button>
		</Container>
	);
};

export default CartView;
