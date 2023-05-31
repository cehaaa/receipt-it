import { Outlet } from "react-router-dom";

import NavLink from "../../components/NavLink/NavLink";

const TopTracks = () => {
	return (
		<>
			<div className='sticky top-3 z-50 bg-black pb-4 pt-0 sm:top-[72px] sm:pt-0'>
				<div>
					<div className='text-lg font-medium'>My Top Tracks</div>
					<div className='text-sm text-neutral-gray'>
						Don't forget to share the moment
					</div>
				</div>
				<div className='hide-scroll-bar mt-3 flex w-full overflow-scroll sm:mt-4'>
					<NavLink path='/top-tracks/short-term' name='4 Weeks' />
					<NavLink path='/top-tracks/medium-term' name='6 Months' />
					<NavLink path='/top-tracks/all-time' name='All time' />
					<NavLink path='/top-tracks/recommendations' name='Recommendations' />
				</div>
			</div>

			<Outlet />
		</>
	);
};

export default TopTracks;
