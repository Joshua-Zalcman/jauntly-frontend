import { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

const Header = () => {
	const history = useHistory();
	const { userInfo, logoutUser, checkForToken, emptyCart } =
		useContext(GlobalContext);

	useEffect(() => {
		checkForToken();
	}, []);

	const handleLogout = () => {
		logoutUser();
		emptyCart();
		history.push('/');
	};

	return (
		<div>
			{userInfo && <p>{userInfo.name}</p>}
			<Link to="/">Home </Link>
			<Link to="/packages">Packages </Link>
			<Link to="/users/login">Login </Link>
			{userInfo.isAdmin && <Link to="/admin/dashboard">Dashboard </Link>}
			<Link to="/cart">Cart </Link>
			{userInfo._id && <Link to={`/bookings/${userInfo._id}`}>Bookings </Link>}
			<button onClick={handleLogout}>Logout</button>
		</div>
	);
};

export default Header;
