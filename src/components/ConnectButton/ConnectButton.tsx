import useAuthService from "../../services/useAuthService";

const ConnectButton = () => {
	const { requestUserAuth } = useAuthService();

	const authSignIn = async () => {
		await requestUserAuth();
	};

	return (
		<button
			className='min-h-fit rounded-md bg-primary px-5 py-2 font-medium text-black duration-200 hover:bg-primary-hover'
			onClick={authSignIn}>
			Connect
		</button>
	);
};

export default ConnectButton;
