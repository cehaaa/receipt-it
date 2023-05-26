import { useState, useEffect, useCallback, useContext } from "react";

import AppContext from "../../context/AppContext";

import useGetCurrentUserPlaylistService from "../../services/useGetCurrentUserPlaylistService";

import UserPlaylistCard from "./UserPlaylistCard";

const UserPlaylist = () => {
	const { currentUserPlaylist, setCurrentUserPlaylist } =
		useContext(AppContext);

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { getCurrentUserPlaylist } = useGetCurrentUserPlaylistService();

	const fetchGetCurrentUserPlaylist = useCallback(async () => {
		setIsLoading(true);

		try {
			const response = await getCurrentUserPlaylist();
			const data = await response.json();

			setCurrentUserPlaylist(data);
		} catch (error) {
			console.error(error);
		}

		setIsLoading(false);
	}, []);

	useEffect(() => {
		if (Object.keys(currentUserPlaylist).length <= 0)
			fetchGetCurrentUserPlaylist();
	}, [fetchGetCurrentUserPlaylist, currentUserPlaylist]);

	if (isLoading) return <div>Loading...</div>;

	return (
		<div className='hide-scroll-bar flex w-full gap-x-3 overflow-x-scroll scroll-smooth'>
			{currentUserPlaylist.items &&
				currentUserPlaylist.items.map((item, index) => {
					return <UserPlaylistCard key={index} playlist={item} />;
				})}
		</div>
	);
};

export default UserPlaylist;
