import { useState, useEffect, useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import PackagesView from '../views/PackagesView';
import PackageView from '../views/PackageView';
import HomeView from '../views/HomeView';
import LoginView from '../views/LoginView';
import UsersView from '../views/UsersView';
import RegisterUserView from '../views/RegisterUserView';
import { GlobalContext } from '../context/GlobalState';
import { getUserFromToken } from '../actions/token_actions';
import CartView from '../views/CartView';

const Main = () => {
	const [packages, setPackages] = useState(null);
	const { userInfo } = useContext(GlobalContext);
	//this will be heroku url
	const URL = 'http://localhost:4000';

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
					exact
					path="/users"
					render={(rp) => {
						const user = getUserFromToken();
						if (userInfo.isAdmin) {
							return <UsersView URL={URL} {...rp} />;
						} else if (user && user.isAdmin) {
							return <UsersView URL={URL} {...rp} />;
						}
						return <Redirect to="/users/login" />;
					}}
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
			</Switch>
		</main>
	);
};

export default Main;
