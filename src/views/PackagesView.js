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
	ButtonGroup,
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
					<CardImg
						top
						src={pack.image}
						alt={pack.name}
						style={{ objectFit: 'cover', height: '240px' }}
					/>
				</Link>
				<CardBody>
					<h5>
						{pack.title} - ${pack.price}
					</h5>
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
			<h1 className="text-center mb-4 ">Trip Packages</h1>
			<ButtonGroup className="my-3 mx-auto w-75 bg-secondary d-flex flex-wrap justify-content-around rounded">
				<UncontrolledDropdown navbar>
					<DropdownToggle
						aria-haspopup={true}
						caret
						style={{
							backgroundColor: 'transparent',
							borderColor: 'transparent',
						}}
						data-toggle="dropdown"
						href="#pablo"
						id="navbarDropdownMenuLink"
						onClick={(e) => e.preventDefault()}>
						Brazil
					</DropdownToggle>
					<DropdownMenu
						aria-labelledby="navbarDropdownMenuLink"
						className="border border-dark">
						<DropdownItem
							id="Rio de Janeiro"
							onClick={handleClick}
							className="bg-primary ">
							Rio de Janeiro
						</DropdownItem>
						<DropdownItem
							id="Sao Paulo"
							onClick={handleClick}
							className="bg-primary ">
							Sao Paulo
						</DropdownItem>
						<DropdownItem
							id="Manaus"
							onClick={handleClick}
							className="bg-primary">
							Manaus
						</DropdownItem>
					</DropdownMenu>
				</UncontrolledDropdown>
				<UncontrolledDropdown navbar>
					<DropdownToggle
						aria-haspopup={true}
						caret
						style={{
							backgroundColor: 'transparent',
							borderColor: 'transparent',
						}}
						data-toggle="dropdown"
						href="#pablo"
						id="navbarDropdownMenuLink"
						onClick={(e) => e.preventDefault()}>
						Peru
					</DropdownToggle>
					<DropdownMenu aria-labelledby="navbarDropdownMenuLink">
						<DropdownItem disabled className="bg-primary border border-dark">
							Coming Soon!
						</DropdownItem>
					</DropdownMenu>
				</UncontrolledDropdown>
				<UncontrolledDropdown navbar>
					<DropdownToggle
						aria-haspopup={true}
						caret
						style={{
							backgroundColor: 'transparent',
							borderColor: 'transparent',
						}}
						data-toggle="dropdown"
						href="#pablo"
						id="navbarDropdownMenuLink"
						onClick={(e) => e.preventDefault()}>
						Ecuador
					</DropdownToggle>
					<DropdownMenu aria-labelledby="navbarDropdownMenuLink">
						<DropdownItem disabled className="bg-primary border border-dark">
							Coming Soon!
						</DropdownItem>
					</DropdownMenu>
				</UncontrolledDropdown>
			</ButtonGroup>

			<div className="d-flex flex-wrap justify-content-around">
				{packageList ? loaded() : <p>Loading...</p>}
			</div>
		</section>
	);
};

export default PackagesView;
