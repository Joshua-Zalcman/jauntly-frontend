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
	UncontrolledDropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
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
			<UncontrolledDropdown navbar>
				<DropdownToggle
					aria-haspopup={true}
					caret
					color="default"
					data-toggle="dropdown"
					href="#pablo"
					id="navbarDropdownMenuLink"
					onClick={(e) => e.preventDefault()}>
					Brazil
				</DropdownToggle>
				<DropdownMenu
					aria-labelledby="navbarDropdownMenuLink"
					className="bg-primary">
					<DropdownItem id="Rio de Janeiro" onClick={handleClick}>
						Rio de Janeiro
					</DropdownItem>
					<DropdownItem id="Sao Paulo" onClick={handleClick}>
						Sao Paulo
					</DropdownItem>
					<DropdownItem id="Manaus" onClick={handleClick}>
						Manaus
					</DropdownItem>
				</DropdownMenu>
			</UncontrolledDropdown>

			<p>Coming soon...Peru!</p>
			{packageList ? loaded() : <p>Loading...</p>}
		</section>
	);
};

export default PackagesView;
