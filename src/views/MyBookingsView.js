import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import axios from 'axios';
import { getToken } from '../actions/token_actions';
import { Col, Row, ListGroup, ListGroupItem, Button } from 'reactstrap';

const MyBookingsView = ({ URL, history }) => {
	const { userInfo } = useContext(GlobalContext);
	const [bookings, setBookings] = useState(null);
	useEffect(() => {
		const user = getToken();
		if (userInfo._id) {
			getBookings(userInfo._id);
		} else if (user && user._id) {
			getBookings(user._id);
		} else {
			history.push('/users/login');
		}
	}, []);

	const getBookings = async (id) => {
		const response = await axios.get(`${URL}/bookings/${id}`);
		setBookings(response.data.bookings);
	};

	const loaded = () => {
		return bookings.map((booking, index) => (
			<ListGroup key={booking._id} style={{ width: '330px' }} md={6}>
				<h3>Booking {index + 1}</h3>
				{booking.bookingItems.map((pack, index) => (
					<ListGroupItem key={pack._id}>
						<div className=" d-flex justify-content-around align-items-center mb-3">
							<div
								style={{
									backgroundImage: `url(${pack.image})`,
									backgroundSize: 'cover',
									backgroundRepeat: 'no-repeat',
									width: '100px',
									maxWidth: '100px',
									height: '100px',
								}}></div>
							<div>
								<h5>Package {index + 1}</h5>
								<p>{pack.title}</p>
								<p>Number of travellers: {pack.guestNumber}</p>
								<p>Date: {pack.date.split('T')[0]}</p>
							</div>
						</div>
						<Col sm={12}>
							<Button
								className="mx-auto w-100 d-block "
								color="success"
								disabled>
								Pay Now
							</Button>
						</Col>
					</ListGroupItem>
				))}
			</ListGroup>
		));
	};

	return (
		<div>
			<h1>Your Bookings</h1>
			<div className="d-flex flex-wrap justify-content-between">
				{bookings && bookings.length > 0 ? (
					loaded()
				) : (
					<p>You have no bookings</p>
				)}
			</div>
		</div>
	);
};

export default MyBookingsView;
