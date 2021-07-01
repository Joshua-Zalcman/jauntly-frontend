import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import PackagesView from '../views/PackagesView';
import PackageView from '../views/PackageView';
import HomeView from '../views/HomeView';

const Main = () => {
	const [packages, setPackages] = useState(null);
	//this will be heroku url
	const URL = 'http://localhost:4000/packages/';

	const getPackages = async () => {
		try {
			const response = await axios.get(URL);
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
			</Switch>
		</main>
	);
};

export default Main;
