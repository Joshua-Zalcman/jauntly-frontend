import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import PackagesView from '../views/PackagesView';
import PackageView from '../views/PackageView';
import HomeView from '../views/HomeView';

const Main = () => {
	const [packages, setPackages] = useState(null);
	const URL = 'http://localhost:4000/packages/';

	const getPackages = async () => {
		try {
			const response = await axios.get(URL);
			setPackages(response.data);
			console.log(packages);
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
				<Route path="/packages">
					<PackagesView />
				</Route>
				<Route
					path="/packages/:id"
					render={(rp) => {
						<PackageView {...rp} />;
					}}
				/>
			</Switch>
		</main>
	);
};

export default Main;
