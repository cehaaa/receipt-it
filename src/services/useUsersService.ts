export enum TimeRange {
	LongTerm = "long_term",
	MediumTerm = "medium_term",
	ShortTerm = "short_term",
}

export const useUsersService = () => {
	function getCurrentUserProfile() {
		const accessToken = localStorage.getItem("access_token");

		return fetch("https://api.spotify.com/v1/me", {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	}

	type getUserTopTracksProps = {
		limit?: number;
		time_range?: TimeRange;
	};

	function getUserTopTracks({
		limit = 10,
		time_range = TimeRange.ShortTerm,
	}: getUserTopTracksProps) {
		return fetch(
			`https://api.spotify.com/v1/me/top/tracks?time_range=${time_range}&limit=${limit}`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("access_token")}`,
				},
			}
		);
	}

	function getUserTopArtist() {
		return fetch(
			"https://api.spotify.com/v1/me/top/artist?time_range=short_term&limit=10",
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("access_token")}`,
				},
			}
		);
	}

	return { getCurrentUserProfile, getUserTopTracks, getUserTopArtist };
};

export default useUsersService;
