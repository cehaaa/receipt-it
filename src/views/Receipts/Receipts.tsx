import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Outlet } from "react-router-dom";

import NavLink from "../../components/NavLink/NavLink";

const Receipts = () => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate("/receipts/short-term");
	}, []);

	return (
		<div className='flex flex-col space-x-10 sm:flex-row'>
			<div className='flex flex-row sm:flex-col sm:space-y-5'>
				<NavLink path='/receipts/short-term' name='4 Weeks' />
				<NavLink path='/receipts/medium-term' name='6 Months' />
				<NavLink path='/receipts/all-time' name='All time' />
			</div>

			<div className='mt-4 sm:mt-0'>
				<Outlet />
			</div>
		</div>
	);
};

export default Receipts;
