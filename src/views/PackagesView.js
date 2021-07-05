import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
			<button id="Rio de Janeiro" onClick={handleClick}>
				Rio de Janeiro
			</button>
			<button id="Sao Paulo" onClick={handleClick}>
				Sao Paulo
			</button>
			<button id="Manaus" onClick={handleClick}>
				Manaus
			</button>
			<p>Coming soon...Peru!</p>
			{packageList ? loaded() : <p>Loading...</p>}
		</section>
	);
};

export default PackagesView;
