import { useContext, useEffect, useCallback, useState } from "react";

import AppContext from "../../context/AppContext";

import useGetUserTopItemService, {
	TimeRange,
	useUsersService,
} from "../../services/useUsersService";
import useArtistService from "../../services/useArtistsService";
import useTracksService from "../../services/useTracksService";
import usePlaylistsService from "../../services/usePlaylistsService";

import { Track } from "../../interfaces/RecommendationsInterface";
import { Artist } from "../../interfaces/UserTopTrackInterface";

import Loading from "../../components/Loading/Loading";
import RenderIf from "../../components/RenderIf/RenderIf";
import AppButton from "../../components/AppButton/AppButton";
import TopTrackDataView from "../../components/TrackDataView/TrackDataView";
import { TopTracksRecommendationsSuccessModal } from "./components/TopTracksRecommendationsSuccessModal";

import msToReadableTime from "../../utils/msToReadableTime";

const TopTracksRecommendations = () => {
	const {
		currentUserProfile,
		setCurrentUserProfile,
		recommendationsTracks,
		setRecommendationsTracks,
	} = useContext(AppContext);

	const { getArtist } = useArtistService();
	const { getUserTopTracks } = useGetUserTopItemService();
	const { getRecommendations } = useTracksService();
	const { createPlaylist, addItemsToPlaylist } = usePlaylistsService();
	const { getCurrentUserProfile } = useUsersService();

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isAddingToPlaylistLoading, setIsAddingToPlaylistLoading] =
		useState<boolean>(false);
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);

	const [createdPlaylistUrl, setCreatedPlaylistUrl] = useState<string>("");

	const fetchUserTopTracksShortTerm = useCallback(async () => {
		setIsLoading(true);
		try {
			const response = await getUserTopTracks({
				limit: 5,
				time_range: TimeRange.ShortTerm,
			});

			const data = await response.json();

			return data;
		} catch (error) {
			console.log(error);
		}
	}, []);

	const fetchArtist = useCallback(async (artistsIds: string[]) => {
		try {
			const artists = artistsIds.map(async (artistId: string) => {
				const response = await getArtist(artistId);
				const data = await response.json();

				return data.genres.join(",");
			});

			const rawGenres = (await Promise.all(artists)).join(",");

			const removeDuplication = new Set();

			rawGenres.split(",").map((genre: string) => {
				genre.split(",").map((g: string) => {
					const words = g.split(" ").join("%2C");

					removeDuplication.add(words);
				});
			});

			return removeDuplication;
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	const processSeed = useCallback(async () => {
		const userTopTracks = await fetchUserTopTracksShortTerm();

		const tracks = userTopTracks.items[0].id;

		const artists = userTopTracks.items.map((track: Track) =>
			track.artists.map((artist: Artist) => artist.id).join(",")
		);

		const genres = await fetchArtist(artists);

		return { tracks, artists, genres };
	}, []);

	const fetchRecommendations = useCallback(async () => {
		const { tracks, artists, genres } = await processSeed();

		const response = await getRecommendations({
			seed_tracks: tracks,
			seed_artists: artists[0],
			seed_genres: Array.from(genres!).join(",").slice(0, 3),
		});

		const data = await response.json();

		setRecommendationsTracks(data);
	}, []);

	const createNewPlaylist = useCallback(
		async (userId: string, name: string) => {
			try {
				const response = await createPlaylist(userId, name);
				const data = await response.json();

				setCreatedPlaylistUrl(data.external_urls.spotify);

				return data;
			} catch (error) {
				console.log(error);
			}
		},
		[]
	);

	const addTracksToPlayList = useCallback(
		async (userId: string, name: string, tracks: Track[]) => {
			try {
				setIsAddingToPlaylistLoading(true);

				const trackUris = tracks.map(track => track.uri);

				const playlist = await createNewPlaylist(userId, name);
				const response = await addItemsToPlaylist(playlist.id, trackUris);

				const data = await response.json();

				if (data) setIsSuccessModalOpen(true);
			} catch (error) {
				console.log(error);
			} finally {
				setIsAddingToPlaylistLoading(false);
			}
		},
		[]
	);

	const fetchCurrentUserProfile = useCallback(async () => {
		try {
			const response = await getCurrentUserProfile();
			const data = await response.json();

			setCurrentUserProfile(data);
		} catch (error) {
			console.error(error);
		}
	}, []);

	useEffect(() => {
		if (Object.keys(recommendationsTracks).length === 0) {
			fetchRecommendations();
		}
	}, [processSeed, recommendationsTracks, fetchRecommendations]);

	useEffect(() => {
		if (Object.keys(currentUserProfile).length === 0) {
			fetchCurrentUserProfile();
		}
	}, [fetchCurrentUserProfile, currentUserProfile]);

	return (
		<>
			<div className='bg-black pb-3 text-sm text-neutral-gray '>
				Hi{" "}
				<span className='text-white'>
					{currentUserProfile?.display_name || "Some user"}{" "}
				</span>
				We've got some amazing recommendations for you, curated with love and
				packed with pure musical goodness!
			</div>

			<RenderIf condition={isLoading}>
				<Loading />
			</RenderIf>

			<RenderIf condition={!isLoading}>
				<div className='w-full space-y-3'>
					{recommendationsTracks.tracks &&
						recommendationsTracks.tracks.map((track, index) => {
							return (
								<TopTrackDataView.Container key={index}>
									<TopTrackDataView.Title
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
										<TopTrackDataView.Album
											albumName={track.album.name}
											href={track.album.external_urls.spotify}
										/>
									</div>

									<div className='hidden sm:block'>
										<TopTrackDataView.Duration
											duration={msToReadableTime(track.duration_ms)}
										/>
									</div>
								</TopTrackDataView.Container>
							);
						})}
				</div>
			</RenderIf>

			<div className='mt-3'>
				<AppButton
					isLoading={isAddingToPlaylistLoading}
					className='w-full'
					onClick={() =>
						addTracksToPlayList(
							currentUserProfile.id,
							currentUserProfile.display_name,
							recommendationsTracks.tracks
						)
					}>
					Add to playlist!
				</AppButton>
			</div>

			<RenderIf condition={isSuccessModalOpen}>
				<TopTracksRecommendationsSuccessModal
					setIsSuccessModalOpen={setIsSuccessModalOpen}
					createdPlaylistUrl={createdPlaylistUrl}
				/>
			</RenderIf>
		</>
	);
};

export default TopTracksRecommendations;
