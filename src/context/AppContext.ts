/* eslint-disable @typescript-eslint/no-empty-function */
import { Dispatch, SetStateAction, createContext } from "react";

import { CurrentUserProfile } from "../interfaces/CurrentUserProfileInterface";
import { CurrentUserPlaylist } from "../interfaces/CurrentUserPlaylistInterface";

type AppContextProps = {
	accessToken: string;
	setAccessToken: Dispatch<SetStateAction<string>>;

	currentUserProfile: CurrentUserProfile;
	setCurrentUserProfile: Dispatch<SetStateAction<CurrentUserProfile>>;

	currentUserPlaylist: CurrentUserPlaylist;
	setCurrentUserPlaylist: Dispatch<SetStateAction<CurrentUserPlaylist>>;

	isAuthenticated: boolean;
	setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
};

export const AppContext = createContext<AppContextProps>({
	accessToken: "",
	setAccessToken: () => {},

	currentUserProfile: {} as CurrentUserProfile,
	setCurrentUserProfile: () => {},

	currentUserPlaylist: {} as CurrentUserPlaylist,
	setCurrentUserPlaylist: () => {},

	isAuthenticated: false,
	setIsAuthenticated: () => {},
});

export default AppContext;
