import { useState, useEffect, useCallback, useContext } from "react";

import AppContext from "../../context/AppContext";

import useGetProfileService from "../../services/useGetCurrentUserProfileService";

import RenderIf from "../../components/RenderIf/RenderIf";
import NotConnected from "../../components/NotConnected/NotConnected";

import UserProfileHeader from "../../components/UserProfileHeader/UserProfileHeader";
import UserPlaylist from "../../components/UserPaylist/UserPlaylist";

const Home = () => {
	const { isAuthenticated } = useContext(AppContext);

	return (
		<>
			<RenderIf condition={isAuthenticated}>
				<UserProfileHeader />

				<div className='mt-5'>
					<UserPlaylist />
				</div>
			</RenderIf>

			<RenderIf condition={!isAuthenticated}>
				<NotConnected />
			</RenderIf>
		</>
	);
};

export default Home;
