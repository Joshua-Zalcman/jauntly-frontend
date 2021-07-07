import { useState } from 'react';
import UsersView from './UsersView';
import BookingsView from './BookingsView';
import { Button, ButtonGroup } from 'reactstrap';

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
			<h1 className="mb-2">Admin Dashboard</h1>
			<ButtonGroup>
				<Button onClick={handleClick} disabled={viewItem} className="btn-round">
					Bookings
				</Button>
				<Button
					onClick={handleClick}
					className="btn-round"
					disabled={!viewItem}>
					Users
				</Button>
			</ButtonGroup>
			{viewItem ? <BookingsView URL={URL} /> : <UsersView URL={URL} />}
		</div>
	);
};

export default DashboardView;
