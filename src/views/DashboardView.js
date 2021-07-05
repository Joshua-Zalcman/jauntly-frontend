import { useState, useEffect } from 'react';
import UsersView from './UsersView';

const DashboardView = ({ URL }) => {
	//state
	const [viewItem, setViewItem] = useState(true);

	//useEffect to load booking
  const get

	//form handlers
  const handleClick = ()=>{
    setViewItem(!viewItem)
  }

	return (
		<div>
			<h1>Admin Dashboard</h1>
			<div>
				<button onClick={handleClick}>Bookings</button>
				<button onClick={handleClick}>Users</button>
        {viewItem ? <div>Bookings</div>:<UsersView/>}
			</div>
		</div>
	);
};

export default DashboardView;
