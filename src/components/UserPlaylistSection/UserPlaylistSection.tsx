import { useState, useEffect, useCallback, useContext } from "react";

import { Link } from "react-router-dom";

import AppContext from "../../context/AppContext";

import usePlaylistsService from "../../services/usePlaylistsService";

import CardView from "../CardView/CardView";

const UserPlaylistSection = () => {
	const { currentUserPlaylist, setCurrentUserPlaylist } =
		useContext(AppContext);

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { getCurrentUserPlaylist } = usePlaylistsService();

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
		<>
			<div className='flex items-center justify-between'>
				<div className='text-lg font-medium text-black'>My Playlist Tracks</div>

				<Link to='/top-tracks' className='text-sm'>
					See more
				</Link>
			</div>

			<div className='hide-scroll-bar mt-2 flex w-full gap-x-3 overflow-x-scroll scroll-smooth'>
				{currentUserPlaylist.items &&
					currentUserPlaylist.items.map((item, index) => {
						return (
							<CardView
								key={index}
								image={item.images.length > 0 ? item.images[0].url : ""}
								imageAlt='playlist cover'
								title={item.name}
								subtitle={item.owner.display_name}
							/>
						);
					})}
			</div>
		</>
	);
};

export default UserPlaylistSection;
