import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

const PackagesView = ({ packages }) => {
	const [packageList, setpackageList] = useState('');

	useEffect(() => {
		if (packages) {
			setpackageList(packages.filter((pack) => pack.city === 'Rio de Janeiro'));
		}
	}, []);

	const loaded = () => {
		return packageList.map((pack) => (
			<div key={pack._id}>
				<Link to={`/packages/${pack._id}`}>
					<h1>{pack.title}</h1>
					<img src={pack.image} alt={pack.name} style={{ width: '400px' }} />
				</Link>
				<p>{pack.description}</p>
				<p>${pack.price}</p>
			</div>
		));
	};
	const handleClick = (e) => {
		const list = packages.filter((pack) => pack.city === e.target.id);
		setpackageList(list);
	};

	return (
		<section>
			<h1>Packages</h1>
			<h3>Brazil</h3>
			<Button color="primary" id="Rio de Janeiro" onClick={handleClick}>
				Rio de Janeiro
			</Button>
			<Button color="primary" id="Sao Paulo" onClick={handleClick}>
				Sao Paulo
			</Button>
			<Button color="primary" id="Manaus" onClick={handleClick}>
				Manaus
			</Button>
			<p>Coming soon...Peru!</p>
			{packageList ? loaded() : <p>Loading...</p>}
		</section>
	);
};

export default PackagesView;
