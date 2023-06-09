import { useCallback, useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import RenderIf from "../../components/RenderIf/RenderIf";
import AppContext from "../../context/AppContext";

import useAuthService from "../../services/useAuthService";

const AuthCallback = () => {
	const navigate = useNavigate();

	const { setIsAuthenticated } = useContext(AppContext);

	const { getAccessTokenBody, requestAccessToken } = useAuthService();

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
	}, []);

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
