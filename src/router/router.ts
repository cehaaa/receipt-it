import { createBrowserRouter } from "react-router-dom";

import Layout from "../views/Layout/Layout";

import Home from "../views/Home/Home";
import About from "../views/About/About";

import AuthCallback from "../views/AuthCallback/AuthCallback";

import TopTracks from "../views/TopTracks/TopTracks";
import TopTracksShortTerm from "../views/TopTracks/TopTracksShortTerm";
import TopTracksMediumTerm from "../views/TopTracks/TopTracksMediumTerm";
import TopTracksLongTerm from "../views/TopTracks/TopTracksLongTerm";
import TopTracksRecommendations from "../views/TopTracks/TopTracksRecommendations";

import NotConnected from "../views/NotConnected/NotConnected";

export const routes = [
	{
		path: "/",
		Component: Layout,
		children: [
			{
				path: "/",
				Component: Home,
			},
			{
				path: "/about",
				Component: About,
			},
			{
				path: "/contribute",
			},

			{
				path: "/top-tracks",
				Component: TopTracks,
				children: [
					{
						path: "short-term",
						Component: TopTracksShortTerm,
					},
					{
						path: "medium-term",
						Component: TopTracksMediumTerm,
					},
					{
						path: "all-time",
						Component: TopTracksLongTerm,
					},
					{
						path: "recommendations",
						Component: TopTracksRecommendations,
					},
				],
			},

			{
				path: "/callback",
				Component: AuthCallback,
			},

			{
				path: "/not-connected",
				Component: NotConnected,
			},
		],
	},
];

export const router = createBrowserRouter(routes);

export default router;
