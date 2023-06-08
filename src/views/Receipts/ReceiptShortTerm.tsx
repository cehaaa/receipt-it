import { useContext, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AppContext from "../../context/AppContext";

import { TimeRange } from "../../services/useUsersService";

import useUsersService from "../../services/useUsersService";

import Receipt from "../../components/Receipt/Receipt";
import Loading from "../../components/Loading/Loading";

const ReceiptShortTerm = () => {
	const navigate = useNavigate();

	const {
		setUserTopTracksShortTerm,
		userTopTracksShortTerm,
		setIsAuthenticated,
	} = useContext(AppContext);

	const { getUserTopTracks } = useUsersService();

	const [isLoading, setIsLoading] = useState<boolean>(true);

	const fetchUserTopTracks = useCallback(async () => {
		try {
			setIsLoading(true);
			const response = await getUserTopTracks({
				time_range: TimeRange.ShortTerm,
				limit: 10,
			});
			const data = await response.json();

			if (data.error) {
				if (data.error.status === 401) {
					localStorage.removeItem("access_token");
					localStorage.removeItem("code_verifier");
					localStorage.removeItem("album_memo_user_profile");

					setIsAuthenticated(false);

					navigate("/not-connected");
				}
			}

			setUserTopTracksShortTerm(data);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		if (Object.keys(userTopTracksShortTerm).length === 0) {
			fetchUserTopTracks();
		} else setIsLoading(false);
	}, [fetchUserTopTracks, userTopTracksShortTerm]);

	if (isLoading) return <Loading />;

	return <Receipt selectedTimeRange={TimeRange.ShortTerm} />;
};

export default ReceiptShortTerm;
