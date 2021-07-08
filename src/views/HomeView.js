import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, UncontrolledCarousel, Container } from 'reactstrap';

const HomeView = () => {
	const carouselItems = [
		{
			src: 'https://images.unsplash.com/photo-1589394760151-b4c9890765fe?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGJyYXppbHxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
			altText: 'Slide 1',
			caption: 'Brazil',
		},
		{
			src: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGVydXxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
			altText: 'Slide 2',
			caption: 'Peru',
		},
		{
			src: 'https://images.unsplash.com/photo-1580918860823-f0072f5a6719?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZWN1YWRvcnxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
			altText: 'Slide 3',
			caption: 'Ecuador',
		},
	];
	return (
		<div>
			<div className=" mt-5 w-100 mx-auto">
				<h1 className="my-2">Welcome to Jauntly</h1>
				<p className="mb-2">
					We know you like to keep things simple when planning a trip to your
					next destination. Let us help you! We offer pre-arranged package deals
					for you to pick and choose from to make your next adventure more
					enjoyable!
				</p>
			</div>

			<UncontrolledCarousel items={carouselItems} />
			<LinkContainer to="/packages" className="d-block w-100 my-3">
				<Button color="primary">See Travel Packages</Button>
			</LinkContainer>
		</div>
	);
};

export default HomeView;
