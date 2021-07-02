import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const PackageView = ({ match, history, packages }) => {
	const { addToCart } = useContext(GlobalContext);
	const [packageData, setPackageData] = useState(null);
	const [message, setMessage] = useState('');

	useEffect(() => {
		const id = match.params.id;
		const pack = packages.find((pack) => pack._id === id);
		if (pack) {
			setPackageData(pack);
		} else {
			history.push('/packages');
		}
	}, [history, match.params.id, packages]);

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
				{message && <p>{message}</p>}
				<button onClick={handleAdd}>Add to Cart</button>
			</div>
		);
	};

	const handleAdd = () => {
		//modal will pop down for more info
		addToCart(packageData);
		setMessage('Added to cart');
	};

	return <section>{packageData ? loaded() : <p>Loading...</p>}</section>;
};

export default PackageView;
