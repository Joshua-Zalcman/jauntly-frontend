import { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
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
	Button,
	Container,
} from 'reactstrap';

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
		<Navbar color="warning" expand="xl">
			<Container>
				<NavbarBrand href="/" onClick={(e) => e.preventDefault()}>
					Jauntly
				</NavbarBrand>
				<Nav>
					<NavItem>
						<NavLink>
							<Link to="/">Home</Link>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink>
							<Link to="/packages">Packages</Link>
						</NavLink>
					</NavItem>

					<NavItem>
						<NavLink>
							<Link to="/cart">Cart </Link>
						</NavLink>
					</NavItem>

					<NavItem>
						<NavLink>
							<Link to="/users/login">Login </Link>
						</NavLink>
					</NavItem>
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
									<DropdownItem>
										<Link to="/admin/dashboard">Dashboard </Link>
									</DropdownItem>
								)}
								<DropdownItem>
									<Link to="/cart">Cart </Link>
								</DropdownItem>
								{userInfo._id && (
									<DropdownItem>
										<Link to={`/bookings/${userInfo._id}`}>Bookings </Link>
									</DropdownItem>
								)}
								<DropdownItem onClick={handleLogout}>Logout</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
					)}
				</Nav>
			</Container>
		</Navbar>
	);
};

export default Header;
