import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import {
	Card,
	CardImgOverlay,
	CardTitle,
	CardText,
	CardImg,
	Button,
	CardBody,
	FormGroup,
	Row,
	Col,
	Label,
	Input,
	Alert,
} from 'reactstrap';

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
			<Card className="bg-dark text-white">
				<div className="bg-dark" style={{ opacity: '0.6' }}>
					<CardImg
						src={packageData.pack.image}
						alt={packageData.pack.name}
						style={{ backgroundColor: 'rgba(0,0,0,.8)' }}
					/>
				</div>
				<div className=" p-3 position-absolute">
					<h1 className="mt-0 mb-2">{packageData.pack.title}</h1>
					<p>{packageData.pack.description}</p>
					<h4 className="mt-0">Price per person: ${packageData.pack.price}</h4>
				</div>

				<CardBody>
					{message && <Alert color="warning">{message}</Alert>}
					<form onSubmit={handleSubmit}>
						<Row className="align-items-center">
							<Col>
								<FormGroup>
									<Label>
										Travellers:
										<Input
											type="select"
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
										</Input>
									</Label>
								</FormGroup>
							</Col>
							<Col>
								<FormGroup>
									<Label>
										Date:
										<Input
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
									</Label>
								</FormGroup>
							</Col>{' '}
						</Row>
						<Button
							className=" mt-3 d-block mb-0 w-100"
							color="primary"
							type="submit">
							Add to Cart
						</Button>
					</form>
				</CardBody>
			</Card>
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
				className="my-4"
				color="primary"
				onClick={() => history.push('/packages')}>
				Go Back
			</Button>
			{packageData ? loaded() : <p>Loading...</p>}
		</section>
	);
};

export default PackageView;
