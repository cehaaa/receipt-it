import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AppContext from "../../context/AppContext";

import RenderIf from "../../components/RenderIf/RenderIf";

import UserProfileHeader from "../../components/UserProfileHeader/UserProfileHeader";
import UserTopTracksSection from "./components/UserTopTracksSection/UserTopTracksSection";

const Home = () => {
	const navigate = useNavigate();
	const { isAuthenticated } = useContext(AppContext);

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/not-connected");
		}
	});

	return (
		<>
			<RenderIf condition={isAuthenticated}>
				<UserProfileHeader />

				<div className='mt-5'>
					<UserTopTracksSection />
				</div>

				<div className='mt-5'>{/* <UserPlaylist /> */}</div>
			</RenderIf>
		</>
	);
};

export default Home;
