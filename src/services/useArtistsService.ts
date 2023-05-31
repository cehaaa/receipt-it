const useArtistsService = () => {
	function getArtist(id: string) {
		return fetch(`https://api.spotify.com/v1/artists/${id}`, {
			method: "GET",
			headers: {
				Authorization: "Bearer " + localStorage.getItem("access_token"),
			},
		});
	}

	return { getArtist };
};

export default useArtistsService;
