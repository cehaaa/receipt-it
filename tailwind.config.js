/* eslint-disable no-undef */

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#1cd760",
			},
		},
	},
	plugins: [require("@tailwindcss/line-clamp")],
};
