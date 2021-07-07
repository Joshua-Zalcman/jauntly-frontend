import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Button } from 'reactstrap';

const PackageView = ({ match, history, packages }) => {
	const { addToCart } = useContext(GlobalContext);
	const [packageData, setPackageData] = useState({
		pack: {},
		date: '',
		guestNumber: 1,
	});
	const [message, setMessage] = useState('');
	// const [guestNumber, setGuestNumber] = useState(1);
	// const [date, setDate] = useState('');

	useEffect(() => {
		const id = match.params.id;
		if (!packages) {
			//can change to api call
			history.push('/');
		} else {
			const pack = packages.find((pack) => pack._id === id);
			if (pack) {
				setPackageData((prevState) => {
					return { ...prevState, pack: pack };
				});
			} else {
				history.push('/packages');
			}
		}
	}, [history, match.params.id, packages]);

	const loaded = () => {
		return (
			<div>
				<h1>{packageData.pack.title}</h1>
				<img
					src={packageData.pack.image}
					alt={packageData.pack.name}
					style={{ width: '400px' }}
				/>
				<p>{packageData.pack.description}</p>
				<p>${packageData.pack.price}</p>
				{message && <p>{message}</p>}
				<form onSubmit={handleSubmit}>
					<label>
						Number of travellers:
						<select
							name="guestNumber"
							onChange={(e) =>
								setPackageData({
									...packageData,
									[e.target.name]: e.target.value,
								})
							}>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
						</select>
					</label>
					<label>
						Date:
						<input
							type="date"
							value={packageData.date}
							name="date"
							onChange={(e) =>
								setPackageData({
									...packageData,
									[e.target.name]: e.target.value,
								})
							}
						/>
					</label>
					<input type="submit" value="Add to Cart" />
				</form>
			</div>
		);
	};

	const handleSubmit = (e) => {
		//modal will pop down for more info
		e.preventDefault();
		if (!packageData.date) {
			setMessage('please select date');
		} else {
			setMessage('Added to cart');
			addToCart(packageData);
		}
	};

	return (
		<section>
			<Button
				className="my-2"
				color="primary"
				onClick={() => history.push('/packages')}>
				Go Back
			</Button>
			{packageData ? loaded() : <p>Loading...</p>}
		</section>
	);
};

export default PackageView;
