import { useCallback, useEffect, useContext, useState } from "react";

import { Link } from "react-router-dom";

import AppContext from "../../../../context/AppContext";

import useUsersService from "../../../../services/useUsersService";

import Loading from "../../../../components/Loading/Loading";

import UserTopTracksList from "./UserTopTracksList";

const UserTopTracksSection = () => {
	const { userTopTracksShortTerm, setUserTopTracksShortTerm } =
		useContext(AppContext);

	const { getUserTopTracks } = useUsersService();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchUserTopTracks = useCallback(async () => {
		try {
			setIsLoading(true);

			const response = await getUserTopTracks({
				limit: 10,
			});
			const data = await response.json();

			setUserTopTracksShortTerm(data);
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		if (Object.keys(userTopTracksShortTerm).length === 0) fetchUserTopTracks();
	}, [fetchUserTopTracks, userTopTracksShortTerm]);

	if (isLoading) return <Loading />;

	return (
		<div>
			<div className='flex items-center justify-between font-medium'>
				<div className='text-base sm:text-lg'>My Top Tracks</div>

				<Link
					to='/top-tracks/short-term'
					className='text-sm text-neutral-gray hover:underline'>
					See more
				</Link>
			</div>

			<UserTopTracksList />
		</div>
	);
};

export default UserTopTracksSection;
