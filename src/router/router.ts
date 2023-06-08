import { createBrowserRouter } from "react-router-dom";

import Layout from "../views/Layout/Layout";

import Home from "../views/Home/Home";
import About from "../views/About/About";
import Contribute from "../views/Contribute/Contribute";

import AuthCallback from "../views/AuthCallback/AuthCallback";

import TopTracks from "../views/TopTracks/TopTracks";
import TopTracksShortTerm from "../views/TopTracks/TopTracksShortTerm";
import TopTracksMediumTerm from "../views/TopTracks/TopTracksMediumTerm";
import TopTracksLongTerm from "../views/TopTracks/TopTracksLongTerm";
import TopTracksRecommendations from "../views/TopTracks/TopTracksRecommendations";

import Receipts from "../views/Receipts/Receipts";
import ReceiptShortTerm from "../views/Receipts/ReceiptShortTerm";
import ReceiptMediumTerm from "../views/Receipts/ReceiptMediumTerm";
import ReceiptLongTerm from "../views/Receipts/ReceiptLongTerm";

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
				Component: Contribute,
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
				path: "/receipts",
				Component: Receipts,
				children: [
					{
						path: "short-term",
						Component: ReceiptShortTerm,
					},
					{
						path: "medium-term",
						Component: ReceiptMediumTerm,
					},
					{
						path: "all-time",
						Component: ReceiptLongTerm,
					},
				],
			},
			{
				path: "/callback",
				Component: AuthCallback,
				query: {
					code: "code",
					state: "state",
				},
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
