import { useState, useEffect } from 'react';

const PackageView = ({ match, history, packages }) => {
	const [packageData, setPackageData] = useState(null);

	useEffect(() => {
		const id = match.params.id;
		const pack = packages.find((pack) => pack._id === id);
		if (pack) {
			setPackageData(pack);
		} else {
			history.push('/packages');
		}
	}, []);

	const loaded = () => {
		return (
			<div>
				<h1>{packageData.title}</h1>
				<img
					src={packageData.image}
					alt={packageData.name}
					style={{ width: '400px' }}
				/>
				<p>{packageData.description}</p>
				<p>${packageData.price}</p>
			</div>
		);
	};

	return <section>{packageData ? loaded() : <p>Loading...</p>}</section>;
};

export default PackageView;
