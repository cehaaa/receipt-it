import { useContext, useEffect, useState, useCallback } from "react";

import { Link } from "react-router-dom";

import AppContext from "../../context/AppContext";

import useGetCurrentUserProfileService from "../../services/useGetCurrentUserProfileService";

const UserProfileHeader = () => {
	const { isAuthenticated, currentUserProfile, setCurrentUserProfile } =
		useContext(AppContext);

	const { getCurrentUserProfile } = useGetCurrentUserProfileService();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchUserProfile = useCallback(async () => {
		setIsLoading(true);

		try {
			const response = await getCurrentUserProfile();
			const data = await response.json();

			setCurrentUserProfile(data);
		} catch (error) {
			console.log(error);
		}

		setIsLoading(false);
	}, []);

	useEffect(() => {
		if (Object.keys(currentUserProfile).length === 0 && isAuthenticated)
			fetchUserProfile();
	}, [fetchUserProfile, isAuthenticated, currentUserProfile]);

	if (isLoading) return <div>Loading user profile header...</div>;

	return (
		<div className='flex items-center justify-between'>
			<div className='font-serif text-xl'>
				Welcome, {currentUserProfile.display_name}
			</div>
			<Link
				target='_blank'
				// to='/'
				to={
					currentUserProfile.external_urls
						? currentUserProfile.external_urls.spotify
						: ""
				}
				className='h-10 w-10 cursor-pointer overflow-auto rounded-full bg-gray-300'>
				<img
					src={
						currentUserProfile.images ? currentUserProfile.images[0].url : ""
					}
					className='duration-200 hover:scale-110'
				/>
			</Link>
		</div>
	);
};

export default UserProfileHeader;
