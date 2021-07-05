import { useState, useEffect } from 'react';
import UsersView from './UsersView';
import BookingsView from './BookingsView';

const DashboardView = ({ URL }) => {
	//state
	const [viewItem, setViewItem] = useState(true);

	//useEffect to load booking

	//form handlers
	const handleClick = () => {
		setViewItem(!viewItem);
	};

	return (
		<div>
			<h1>Admin Dashboard</h1>
			<div>
				<button onClick={handleClick} disabled={viewItem}>
					Bookings
				</button>
				<button onClick={handleClick} disabled={!viewItem}>
					Users
				</button>
				{viewItem ? <BookingsView URL={URL} /> : <UsersView URL={URL} />}
			</div>
		</div>
	);
};

export default DashboardView;
