import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Outlet } from "react-router-dom";

import NavLink from "../../components/NavLink/NavLink";

import AppContext from "../../context/AppContext";

const Receipts = () => {
	const { isAuthenticated } = useContext(AppContext);

	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/not-connected");
			return;
		}

		navigate("/receipts/short-term");
	}, [isAuthenticated, navigate]);

	if (!isAuthenticated) return null;

	return (
		<div className='flex flex-col justify-between sm:flex-row'>
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
