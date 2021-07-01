import React from 'react';
import { Link } from 'react-router-dom';

const PackagesView = ({ packages }) => {
	const loaded = () => {
		return packages.map((pack) => (
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

	return (
		<section>
			<h1>Packages</h1>
			{packages ? loaded() : <p>Loading...</p>}
		</section>
	);
};

export default PackagesView;
