import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
	return (
		<div>
			<Link to="/">Home</Link>
			<Link to="/packages">Packages</Link>
			<Link to="/users/login">Login</Link>
		</div>
	);
};

export default Header;
