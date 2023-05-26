export const useGetCurrentUserProfileService = () => {
	function getCurrentUserProfile() {
		const accessToken = localStorage.getItem("access_token");

		return fetch("https://api.spotify.com/v1/me", {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	}

	return { getCurrentUserProfile };
};

export default useGetCurrentUserProfileService;
