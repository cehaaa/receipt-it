/* eslint-disable @typescript-eslint/no-non-null-assertion */
const usePlaylistsService = () => {
	function getCurrentUserPlaylist() {
		return fetch("https://api.spotify.com/v1/me/playlists", {
			method: "GET",
			headers: {
				Authorization: "Bearer " + localStorage.getItem("access_token"),
			},
		});
	}

	function createPlaylist(userId: string, name: string) {
		return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("access_token")}`,
			},
			body: JSON.stringify({
				name: `Created for ${name}`,
				description:
					"recommendations for you, curated with love and packed with pure musical goodness!",
				public: false,
			}),
		});
	}

	function addItemsToPlaylist(playlistId: string, uris: string[]) {
		return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${localStorage.getItem("access_token")}`,
			},
			body: JSON.stringify({
				uris: uris,
			}),
		});
	}

	return { getCurrentUserPlaylist, createPlaylist, addItemsToPlaylist };
};

export default usePlaylistsService;
