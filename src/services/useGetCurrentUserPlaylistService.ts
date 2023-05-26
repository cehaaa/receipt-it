const useGetCurrentUserPlaylistService = () => {
	function getCurrentUserPlaylist() {
		return fetch("https://api.spotify.com/v1/me/playlists", {
			method: "GET",
			headers: {
				Authorization: "Bearer " + localStorage.getItem("access_token"),
			},
		});
	}

	return { getCurrentUserPlaylist };
};

export default useGetCurrentUserPlaylistService;
