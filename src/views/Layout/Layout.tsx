import { useState } from "react";
import { Outlet } from "react-router-dom";

import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";

import AppContext from "../../context/AppContext";

import { CurrentUserProfile } from "../../interfaces/CurrentUserProfileInterface";
import { CurrentUserPlaylist } from "../../interfaces/CurrentUserPlaylistInterface";
import { UserTopTracks } from "../../interfaces/UserTopTrackInterface";
import { Recommendations } from "../../interfaces/RecommendationsInterface";

const Layout = () => {
	const [accessToken, setAccessToken] = useState<string>(
		localStorage.getItem("access_token") || ""
	);

	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
		localStorage.getItem("access_token") ? true : false
	);

	const [currentUserProfile, setCurrentUserProfile] =
		useState<CurrentUserProfile>({} as CurrentUserProfile);

	const [currentUserPlaylist, setCurrentUserPlaylist] =
		useState<CurrentUserPlaylist>({} as CurrentUserPlaylist);

	const [userTopTracksShortTerm, setUserTopTracksShortTerm] =
		useState<UserTopTracks>({} as UserTopTracks);

	const [userTopTracksMediumTerm, setUserTopTracksMediumTerm] =
		useState<UserTopTracks>({} as UserTopTracks);

	const [userTopTracksLongTerm, setUserTopTracksLongTerm] =
		useState<UserTopTracks>({} as UserTopTracks);

	const [recommendationsTracks, setRecommendationsTracks] =
		useState<Recommendations>({} as Recommendations);

	const appContextValue = {
		accessToken,
		setAccessToken,

		isAuthenticated,
		setIsAuthenticated,

		currentUserProfile,
		setCurrentUserProfile,

		currentUserPlaylist,
		setCurrentUserPlaylist,

		userTopTracksShortTerm,
		setUserTopTracksShortTerm,

		userTopTracksMediumTerm,
		setUserTopTracksMediumTerm,

		userTopTracksLongTerm,
		setUserTopTracksLongTerm,

		recommendationsTracks,
		setRecommendationsTracks,
	};

	return (
		<>
			<AppContext.Provider value={appContextValue}>
				<Container className='flex min-h-screen flex-col'>
					<Header />

					<div className='mb-5'>
						<Outlet />
					</div>
				</Container>
			</AppContext.Provider>
		</>
	);
};

export default Layout;
