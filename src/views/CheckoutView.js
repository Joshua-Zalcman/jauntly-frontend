import { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';

const CheckoutView = ({ history }) => {
	const { userInfo, cart } = useContext(GlobalContext);

	useEffect(() => {
		if (!userInfo || cart.length < 1) {
			history.push('/users/login');
		}
	}, []);

	return (
		<div>
			<h1>Checkout</h1>
		</div>
	);
};

export default CheckoutView;
