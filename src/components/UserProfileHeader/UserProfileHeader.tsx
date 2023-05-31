import { useContext, useEffect, useCallback } from "react";

import { Link } from "react-router-dom";

import AppContext from "../../context/AppContext";

import useUsersService from "../../services/useUsersService";

const UserProfileHeader = () => {
	const { currentUserProfile, setCurrentUserProfile, setIsAuthenticated } =
		useContext(AppContext);

	const { getCurrentUserProfile } = useUsersService();

	const fetchCurrentUserProfile = useCallback(async () => {
		try {
			const response = await getCurrentUserProfile();
			const data = await response.json();

			if (data) {
				setCurrentUserProfile(data);
				localStorage.setItem("album_memo_user_profile", JSON.stringify(data));
			}

			if (data.error) {
				if (data.error.status === 401) {
					localStorage.removeItem("access_token");
					localStorage.removeItem("code_verifier");
					localStorage.removeItem("album_memo_user_profile");

					setIsAuthenticated(false);
				}
			}
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		if (Object.keys(currentUserProfile).length === 0) {
			fetchCurrentUserProfile();
		}
	}, []);

	return (
		<div className='flex items-center justify-between'>
			<div className='text-base text-neutral-gray sm:text-xl'>
				Welcome,{" "}
				<Link
					target='_blank'
					to={
						currentUserProfile.external_urls
							? currentUserProfile.external_urls.spotify
							: ""
					}
					className='cursor-pointer font-semibold text-white hover:underline'>
					{currentUserProfile.display_name}
				</Link>{" "}
				👋
			</div>
			<div className='h-10 w-10 cursor-pointer overflow-auto rounded-full bg-gray-300'>
				<img
					src={
						currentUserProfile.images ? currentUserProfile.images[0].url : ""
					}
					className='duration-200 hover:scale-110'
				/>
			</div>
		</div>
	);
};

export default UserProfileHeader;
