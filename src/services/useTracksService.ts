const useTracksService = () => {
	type GetRecommendationsProps = {
		limit?: string;
		market?: string;
		seed_artists: string;
		seed_genres: string;
		seed_tracks: string;
	};

	function getRecommendations({
		limit = "10",
		market = "ID",
		seed_artists,
		seed_genres,
		seed_tracks,
	}: GetRecommendationsProps) {
		const url = `https://api.spotify.com/v1/recommendations?limit=${limit}&market=${market}&seed_artists=${seed_artists}&seed_genres=${seed_genres}&seed_tracks=${seed_tracks}`;

		return fetch(url, {
			method: "GET",
			headers: {
				Authorization: "Bearer " + localStorage.getItem("access_token"),
			},
		});
	}

	return { getRecommendations };
};

export default useTracksService;
