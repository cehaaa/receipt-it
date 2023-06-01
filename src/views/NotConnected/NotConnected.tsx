import { useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import AppContext from "../../context/AppContext";

import ConnectButton from "../../components/ConnectButton/ConnectButton";

const NotConnected = () => {
	const navigate = useNavigate();

	const { isAuthenticated } = useContext(AppContext);

	useEffect(() => {
		if (isAuthenticated) navigate("/");
	}, []);

	return (
		<div className='mt-20 text-center'>
			<div className='font-serif text-xl leading-8 text-neutral-gray'>
				You're not connected to Spotify. Connect to Spotify to generate your top
				track receipt.
			</div>
			<div className='mt-5'>
				<ConnectButton />
			</div>
		</div>
	);
};

export default NotConnected;
