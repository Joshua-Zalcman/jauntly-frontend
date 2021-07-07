import { useState, useEffect, useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import PackagesView from '../views/PackagesView';
import PackageView from '../views/PackageView';
import HomeView from '../views/HomeView';
import LoginView from '../views/LoginView';
import RegisterUserView from '../views/RegisterUserView';
import { GlobalContext } from '../context/GlobalState';
import { getUserFromToken } from '../actions/token_actions';
import CartView from '../views/CartView';
import CheckoutView from '../views/CheckoutView';
import MyBookingsView from '../views/MyBookingsView';
import DashboardView from '../views/DashboardView';
import { Container } from 'reactstrap';

const Main = () => {
	const [packages, setPackages] = useState(null);
	const { userInfo } = useContext(GlobalContext);
	//this will be heroku url
	const URL = 'https://jauntly-backend.herokuapp.com';

	const getPackages = async () => {
		try {
			const response = await axios.get(`${URL}/packages/`);
			setPackages(response.data.packages);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getPackages();
	}, []);

	return (
		<main>
			<Container>
				<Switch>
					<Route exact path="/">
						<HomeView />
					</Route>
					<Route exact path="/packages">
						<PackagesView packages={packages} />
					</Route>
					<Route
						path="/packages/:id"
						render={(rp) => (
							<PackageView
								{...rp}
								packages={packages}
								getPackages={getPackages}
							/>
						)}
					/>

					<Route
						path="/users/login"
						render={(rp) => <LoginView {...rp} URL={URL} />}
					/>
					<Route
						path="/users/register"
						render={(rp) => <RegisterUserView {...rp} URL={URL} />}
					/>
					<Route path="/cart" render={(rp) => <CartView {...rp} />} />
					<Route
						path="/checkout"
						render={(rp) => <CheckoutView {...rp} URL={URL} />}
					/>
					<Route
						path="/bookings/:id"
						render={(rp) => {
							return <MyBookingsView URL={URL} {...rp} />;
						}}
					/>
					<Route
						path="/admin/dashboard"
						render={(rp) => {
							const user = getUserFromToken();
							if (userInfo.isAdmin) {
								return <DashboardView URL={URL} {...rp} />;
							} else if (user && user.isAdmin) {
								return <DashboardView URL={URL} {...rp} />;
							}
							return <Redirect to="/users/login" />;
						}}
					/>
				</Switch>
			</Container>
		</main>
	);
};

export default Main;
