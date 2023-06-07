/* eslint-disable no-undef */

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#1ed760",
				"primary-hover": "#1fdf64",

				// black: "#191414",
				black: "#121212",

				"black-secondary": "#181818",
				"black-secondary-hover": "#282828",

				"neutral-gray": "#b3b3b3",
			},

			// enable group-hover
			scale: ["active", "group-hover"],
			transformOrigin: ["group-hover"],
			display: ["group-hover"],

			// https://tailwindcss.com/docs/hover-focus-and-other-states#group-hover-and-group-focus
		},
		backgroundImage: {
			"wrinkled-paper":
				"url('https://images.unsplash.com/photo-1586075010923-2dd4570fb338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80')",
		},
	},
	// plugins: [require("@tailwindcss/line-clamp")],
};
