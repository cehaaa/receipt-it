import { createBrowserRouter } from "react-router-dom";

import Layout from "../views/Layout/Layout";

import Home from "../views/Home/Home";
import About from "../views/About/About";

import AuthCallback from "../views/AuthCallback/AuthCallback";

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
				path: "/callback",
				Component: AuthCallback,
			},
		],
	},
];

export const router = createBrowserRouter(routes);

export default router;
