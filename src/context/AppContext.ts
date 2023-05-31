/* eslint-disable @typescript-eslint/no-empty-function */
import { Dispatch, SetStateAction, createContext } from "react";

import { CurrentUserProfile } from "../interfaces/CurrentUserProfileInterface";
import { CurrentUserPlaylist } from "../interfaces/CurrentUserPlaylistInterface";
import { UserTopTracks } from "../interfaces/UserTopTrackInterface";
import { Recommendations } from "../interfaces/RecommendationsInterface";

type AppContextProps = {
	accessToken: string;
	setAccessToken: Dispatch<SetStateAction<string>>;

	isAuthenticated: boolean;
	setIsAuthenticated: Dispatch<SetStateAction<boolean>>;

	currentUserProfile: CurrentUserProfile;
	setCurrentUserProfile: Dispatch<SetStateAction<CurrentUserProfile>>;

	currentUserPlaylist: CurrentUserPlaylist;
	setCurrentUserPlaylist: Dispatch<SetStateAction<CurrentUserPlaylist>>;

	userTopTracksShortTerm: UserTopTracks;
	setUserTopTracksShortTerm: Dispatch<SetStateAction<UserTopTracks>>;

	userTopTracksMediumTerm: UserTopTracks;
	setUserTopTracksMediumTerm: Dispatch<SetStateAction<UserTopTracks>>;

	userTopTracksLongTerm: UserTopTracks;
	setUserTopTracksLongTerm: Dispatch<SetStateAction<UserTopTracks>>;

	recommendationsTracks: Recommendations;
	setRecommendationsTracks: Dispatch<SetStateAction<Recommendations>>;
};

export const AppContext = createContext<AppContextProps>({
	accessToken: "",
	setAccessToken: () => {},

	isAuthenticated: false,
	setIsAuthenticated: () => {},

	currentUserProfile: {} as CurrentUserProfile,
	setCurrentUserProfile: () => {},

	currentUserPlaylist: {} as CurrentUserPlaylist,
	setCurrentUserPlaylist: () => {},

	userTopTracksShortTerm: {} as UserTopTracks,
	setUserTopTracksShortTerm: () => {},

	userTopTracksMediumTerm: {} as UserTopTracks,
	setUserTopTracksMediumTerm: () => {},

	userTopTracksLongTerm: {} as UserTopTracks,
	setUserTopTracksLongTerm: () => {},

	recommendationsTracks: {} as Recommendations,
	setRecommendationsTracks: () => {},
});

export default AppContext;
