import ConnectButton from "../ConnectButton/ConnectButton";

const NotConnected = () => {
	return (
		<div className='mt-20 text-center'>
			<div className='font-serif text-xl'>
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
