import { useContext } from "react";

import AppContext from "../../../../context/AppContext";

import TrackDataView from "../../../../components/TrackDataView/TrackDataView";

const UserTopTracksList = () => {
	const { userTopTracksShortTerm } = useContext(AppContext);

	return (
		<div className='mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3'>
			{userTopTracksShortTerm.items &&
				userTopTracksShortTerm.items.slice(0, 4).map((track, index) => {
					return (
						<TrackDataView.Container key={index}>
							<TrackDataView.Title
								isShowNumber={false}
								trackImage={track.album.images ? track.album.images[0].url : ""}
								trackImageAlt='Track Cover'
								trackTitle={track.name}
								trackHref={track.external_urls.spotify}
								artist={track.artists && track.artists[0].name}
								artistHref={
									track.artists && track.artists[0].external_urls.spotify
								}
							/>
						</TrackDataView.Container>
					);
				})}
		</div>
	);
};

export default UserTopTracksList;
