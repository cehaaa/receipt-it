import { useCallback, useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import useAuthService from "../../services/useAuthService";

import RenderIf from "../../components/RenderIf/RenderIf";
import AppContext from "../../context/AppContext";

const AuthCallback = () => {
	const navigate = useNavigate();
	const { getAccessTokenBody, requestAccessToken } = useAuthService();

	const { setIsAuthenticated } = useContext(AppContext);

	const [isLoading, setIsLoading] = useState<boolean>(true);

	const fetchAccessToken = useCallback(async () => {
		setIsLoading(true);

		try {
			const payload = getAccessTokenBody();
			const response = await requestAccessToken(payload);

			if (!response.ok) {
				throw new Error(`HTTP status ${response.status}`);
			}

			const data = await response.json();

			localStorage.setItem("access_token", data.access_token);

			setIsAuthenticated(true);

			navigate("/");
		} catch (error) {
			console.error(error);
		}

		setIsLoading(false);
	}, [getAccessTokenBody, navigate, requestAccessToken, setIsAuthenticated]);

	useEffect(() => {
		fetchAccessToken();

		return () => {
			setIsLoading(true);
		};
	}, [fetchAccessToken]);

	return (
		<RenderIf condition={isLoading}>
			<div>Loading...</div>
		</RenderIf>
	);
};

export default AuthCallback;
