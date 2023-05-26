import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";

import AppContext from "../../context/AppContext";

import { CurrentUserProfile } from "../../interfaces/CurrentUserProfileInterface";
import { CurrentUserPlaylist } from "../../interfaces/CurrentUserPlaylistInterface";

const Layout = () => {
	const [accessToken, setAccessToken] = useState<string>(
		localStorage.getItem("access_token") || ""
	);

	const [currentUserProfile, setCurrentUserProfile] =
		useState<CurrentUserProfile>({} as CurrentUserProfile);

	const [currentUserPlaylist, setCurrentUserPlaylist] =
		useState<CurrentUserPlaylist>({} as CurrentUserPlaylist);

	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

	const appContextValue = {
		accessToken,
		setAccessToken,

		currentUserProfile,
		setCurrentUserProfile,

		currentUserPlaylist,
		setCurrentUserPlaylist,

		isAuthenticated,
		setIsAuthenticated,
	};

	useEffect(() => {
		if (accessToken) setIsAuthenticated(true);
	}, [accessToken]);

	return (
		<AppContext.Provider value={appContextValue}>
			<Container className='flex min-h-screen flex-col'>
				<Header />

				<div className='text-gray-500'>
					<Outlet />
				</div>
			</Container>
		</AppContext.Provider>
	);
};

export default Layout;
