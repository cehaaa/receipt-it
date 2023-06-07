// import { useCallback, useContext, useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

// import useAuthService from "../../services/useAuthService";

import RenderIf from "../../components/RenderIf/RenderIf";
// import AppContext from "../../context/AppContext";

const AuthCallback = () => {
	const location = useLocation();

	console.log(location);

	// http://localhost:5173/callback?code=AQCahS56-N8fBb6Nn319VukMjXbYEQ5dNkhY5GYruNzHpjA8LMb8TYKp2De4zoe_AMDLwE5RID1nJO80F61H0l-NP1otuZAuFi8iXTQ9xB9vKWBHMfbffmuxq25x1EhSjqzZowkCpuNCwK3YGaYSuuKgks1pS0Zp8d8KMO0J71CLrEQxcdpZmgaKjxJOxk7GohdLMGZ3R1uapHt9t-fN6AHgS93Sqq9Yy_aXENEvifA0lr4NPnArN_RBiNehm84rHRx7my5WIwbd5NhLTnL_6FgzsmPSwQLUNRYHyzaZk7gI9ivBU_cYriI5guSzozBQfypMbPlbYx4w-cN8wDhHSuHm1NBPoqsXqqjtUGbWQ8cTtADMbzoN0MvmCW3_TANPLw7lQbqpoIuR01lzo2cmlg&state=nJphP94jb1y0d5rQ

	// const navigate = useNavigate();

	// const { setIsAuthenticated } = useContext(AppContext);

	// const { getAccessTokenBody, requestAccessToken } = useAuthService();

	// const [isLoading, setIsLoading] = useState<boolean>(true);

	// const fetchAccessToken = useCallback(async () => {
	// 	setIsLoading(true);

	// 	try {
	// 		const payload = getAccessTokenBody();
	// 		const response = await requestAccessToken(payload);

	// 		if (!response.ok) {
	// 			throw new Error(`HTTP status ${response.status}`);
	// 		}

	// 		const data = await response.json();

	// 		localStorage.setItem("access_token", data.access_token);

	// 		setIsAuthenticated(true);

	// 		navigate("/");
	// 	} catch (error) {
	// 		console.error(error);
	// 	}

	// 	setIsLoading(false);
	// }, [getAccessTokenBody, navigate, requestAccessToken, setIsAuthenticated]);

	// useEffect(() => {
	// 	fetchAccessToken();

	// 	return () => {
	// 		setIsLoading(true);
	// 	};
	// }, [fetchAccessToken]);

	return (
		<RenderIf condition={true}>
			<div>Loading...</div>
		</RenderIf>
	);
};

export default AuthCallback;
