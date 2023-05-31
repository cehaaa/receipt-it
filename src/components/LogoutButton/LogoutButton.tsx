import { useContext, useCallback } from "react";

import AppContext from "../../context/AppContext";

const LogoutButton = () => {
	const { setIsAuthenticated } = useContext(AppContext);

	const handleLogout = useCallback(() => {
		localStorage.removeItem("access_token");
		localStorage.removeItem("code_verifier");
		localStorage.removeItem("album_memo_user_profile");

		window.location.href = "/not-connected";

		setIsAuthenticated(false);
	}, []);

	return (
		<button
			onClick={handleLogout}
			className='flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium text-gray-400 duration-200 hover:bg-rose-200 hover:text-rose-500'>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth={1.6}
				stroke='currentColor'
				className='mr-1.5 h-5 w-5'>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9'
				/>
			</svg>

			<div>Logout</div>
		</button>
	);
};

export default LogoutButton;
