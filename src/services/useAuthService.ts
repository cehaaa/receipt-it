/* eslint-disable @typescript-eslint/no-non-null-assertion */

import generateCodeVerifier from "../utils/generateCodeVerifier";

import base64encode from "../utils/base64encode";

export const useAuthService = () => {
	const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
	const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
	const scope = import.meta.env.VITE_SPOTIFY_SCOPE;

	async function generateCodeChallenge(codeVerifier: string) {
		const encoder = new TextEncoder();
		const data = encoder.encode(codeVerifier);
		const digest = await crypto.subtle.digest("SHA-256", data);

		return base64encode(digest);
	}

	async function requestUserAuth() {
		const codeVerifier = generateCodeVerifier(128);
		const state = generateCodeVerifier(16);

		localStorage.setItem("code_verifier", codeVerifier);

		const codeChallenge = await generateCodeChallenge(codeVerifier);

		const args = new URLSearchParams({
			response_type: "code",
			client_id: clientId,
			scope: scope,
			redirect_uri: redirectUri,
			state: state,
			code_challenge_method: "S256",
			code_challenge: codeChallenge,
		});

		const url = `https://accounts.spotify.com/authorize?${args}`;

		location.href = url;
	}

	function getAccessTokenBody() {
		const urlParams = new URLSearchParams(window.location.search);
		const codeVerifier = localStorage.getItem("code_verifier");
		const code = urlParams.get("code");

		const body = new URLSearchParams({
			grant_type: "authorization_code",
			code: code!,
			redirect_uri: redirectUri!,
			client_id: clientId!,
			code_verifier: codeVerifier!,
		});

		return body;
	}

	async function requestAccessToken(payload: URLSearchParams) {
		const response = await fetch("https://accounts.spotify.com/api/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: payload,
		});

		return response;
	}

	return {
		clientId,
		redirectUri,

		getAccessTokenBody,

		requestUserAuth,
		requestAccessToken,
	};
};

export default useAuthService;
