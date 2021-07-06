import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import {
	Button,
	Card,
	CardBody,
	CardImg,
	CardText,
	CardTitle,
} from 'reactstrap';

const PackagesView = ({ packages }) => {
	const [packageList, setpackageList] = useState('');

	useEffect(() => {
		if (packages) {
			setpackageList(packages.filter((pack) => pack.city === 'Rio de Janeiro'));
		}
	}, []);

	const loaded = () => {
		return packageList.map((pack) => (
			<Card key={pack._id} style={{ width: '20rem' }}>
				<Link to={`/packages/${pack._id}`}>
					<CardImg top src={pack.image} alt={pack.name} />
				</Link>
				<CardBody>
					<CardTitle>
						{pack.title} - ${pack.price}
					</CardTitle>
					<CardText>{pack.description}</CardText>
					<LinkContainer to={`/packages/${pack._id}`}>
						<Button color="primary">Book</Button>
					</LinkContainer>
				</CardBody>
			</Card>
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
