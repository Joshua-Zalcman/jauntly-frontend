import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

const Header = () => {
	const { userInfo, logoutUser, checkForToken } = useContext(GlobalContext);

	useEffect(() => {
		checkForToken();
	}, []);

	const handleLogout = () => {
		logoutUser();
	};

	return (
		<div>
			{userInfo && <p>{userInfo.name}</p>}
			<Link to="/">Home </Link>
			<Link to="/packages">Packages </Link>
			<Link to="/users/login">Login </Link>
			<Link to="/users">Users </Link>
			<Link to="/cart">Cart </Link>
			{userInfo._id && <Link to={`/bookings/${userInfo._id}`}>Bookings </Link>}
			<button onClick={handleLogout}>Logout</button>
		</div>
	);
};

export default Header;
