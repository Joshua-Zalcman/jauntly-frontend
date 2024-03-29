import { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { GlobalContext } from '../context/GlobalState';
import {
	UncontrolledCollapse,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	NavbarBrand,
	Navbar,
	NavItem,
	NavLink,
	Nav,
	Badge,
	Container,
} from 'reactstrap';

const Header = () => {
	const history = useHistory();
	const { userInfo, cart, logoutUser, checkForToken, emptyCart } =
		useContext(GlobalContext);
	const [bodyClick, setBodyClick] = useState(false);

	useEffect(() => {
		checkForToken();
	}, []);

	const handleLogout = () => {
		logoutUser();
		emptyCart();
		history.push('/');
	};

	return (
		<>
			{bodyClick ? (
				<div
					id="bodyClick"
					onClick={() => {
						document.documentElement.classList.toggle('nav-open');
						setBodyClick(false);
					}}
				/>
			) : null}
			<Navbar color="primary" expand="lg">
				<Container>
					<LinkContainer to="/">
						<NavbarBrand>Jauntly</NavbarBrand>
					</LinkContainer>
					<button
						className="navbar-toggler"
						id="navbarNavDropdown"
						type="button"
						style={{ color: 'whitesmoke' }}
						onClick={() => {
							document.documentElement.classList.toggle('nav-open');
							setBodyClick(true);
						}}>
						&#9776;
					</button>
					<UncontrolledCollapse navbar toggler="navbarNavDropdown">
						<Nav navbar className="ms-auto">
							<NavItem>
								<LinkContainer to="/">
									<NavLink>Home</NavLink>
								</LinkContainer>
							</NavItem>
							<NavItem>
								<LinkContainer to="/packages">
									<NavLink>Packages</NavLink>
								</LinkContainer>
							</NavItem>
							<NavItem>
								<LinkContainer to="/cart">
									<NavLink>
										Cart <Badge color="danger">{cart.length}</Badge>
									</NavLink>
								</LinkContainer>
							</NavItem>
							{!userInfo.name && (
								<NavItem>
									<LinkContainer to="/users/login">
										<NavLink>Login</NavLink>
									</LinkContainer>
								</NavItem>
							)}
							{!userInfo.name && (
								<NavItem>
									<LinkContainer to="/users/register">
										<NavLink>Sign Up</NavLink>
									</LinkContainer>
								</NavItem>
							)}
							{userInfo.name && (
								<UncontrolledDropdown nav>
									<DropdownToggle
										aria-haspopup={true}
										caret
										color="default"
										data-toggle="dropdown"
										href="#pablo"
										id="navbarDropdownMenuLink"
										nav
										onClick={(e) => e.preventDefault()}>
										{userInfo.name}
									</DropdownToggle>
									<DropdownMenu aria-labelledby="navbarDropdownMenuLink">
										{userInfo.isAdmin && (
											<LinkContainer to="/admin/dashboard">
												<DropdownItem>Dashboard</DropdownItem>
											</LinkContainer>
										)}
										<LinkContainer to="/cart">
											<DropdownItem>Your Cart</DropdownItem>
										</LinkContainer>
										{userInfo._id && (
											<LinkContainer to={`/bookings/${userInfo._id}`}>
												<DropdownItem>Bookings</DropdownItem>
											</LinkContainer>
										)}
										<DropdownItem onClick={handleLogout}>Logout</DropdownItem>
									</DropdownMenu>
								</UncontrolledDropdown>
							)}
						</Nav>
					</UncontrolledCollapse>
				</Container>
			</Navbar>
		</>
	);
};

export default Header;
