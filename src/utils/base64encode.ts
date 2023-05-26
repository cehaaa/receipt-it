export const base64encode = (data: ArrayBuffer) => {
	return btoa(String.fromCharCode.apply(null, [...new Uint8Array(data)]))
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=+$/, "");
};

export default base64encode;

// export const generateCodeChallenge = async (codeVerifier: string) => {
// 	const encoder = new TextEncoder();
// 	const data = encoder.encode(codeVerifier);
// 	const digest = await crypto.subtle.digest("SHA-256", data);

// 	return base64encode(digest);
// };

// export default generateCodeChallenge;
