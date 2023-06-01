import { useState, useCallback, useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import AppContext from "../../context/AppContext";

import { TimeRange } from "../../services/useUsersService";
import useGetUserTopItemService from "../../services/useUsersService";

import Loading from "../../components/Loading/Loading";
import TrackDataView from "../../components/TrackDataView/TrackDataView";

import msToReadableTime from "../../utils/msToReadableTime";

const TopTracksLongTerm = () => {
	const navigate = useNavigate();

	const {
		userTopTracksLongTerm,
		setUserTopTracksLongTerm,
		setIsAuthenticated,
	} = useContext(AppContext);

	const { getUserTopTracks } = useGetUserTopItemService();

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const fetchUserTopTrackLongTerm = useCallback(async () => {
		try {
			setIsLoading(true);
			const response = await getUserTopTracks({
				limit: 10,
				time_range: TimeRange.LongTerm,
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

			setUserTopTracksLongTerm(data);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		if (Object.keys(userTopTracksLongTerm).length === 0) {
			fetchUserTopTrackLongTerm();
		}
	}, [fetchUserTopTrackLongTerm, userTopTracksLongTerm]);

	if (isLoading) return <Loading />;

	return (
		<div>
			<div className='space-y-3'>
				{userTopTracksLongTerm.items &&
					userTopTracksLongTerm.items.map((track, index) => {
						return (
							<TrackDataView.Container key={index}>
								<TrackDataView.Title
									number={index + 1}
									trackImage={
										track.album.images ? track.album.images[0].url : ""
									}
									trackImageAlt='Track Cover'
									trackTitle={track.name}
									trackHref={track.external_urls.spotify}
									artist={track.artists && track.artists[0].name}
									artistHref={
										track.artists && track.artists[0].external_urls.spotify
									}
								/>

								<div className='hidden sm:block'>
									<TrackDataView.Album
										albumName={track.album.name}
										href={track.album.external_urls.spotify}
									/>
								</div>

								<div className='hidden sm:block'>
									<TrackDataView.Duration
										duration={msToReadableTime(track.duration_ms)}
									/>
								</div>
							</TrackDataView.Container>
						);
					})}
			</div>
		</div>
	);
};

export default TopTracksLongTerm;
