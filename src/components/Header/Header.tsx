import { useContext } from "react";

import { Link, useLocation } from "react-router-dom";

import RenderIf from "../RenderIf/RenderIf";
import AppContext from "../../context/AppContext";

const navLinks = [
	{
		path: "/",
		name: "Home",
	},
	{
		path: "/about",
		name: "About",
	},
	{
		path: "/contribute",
		name: "Contribute",
	},
];

const Header = () => {
	const location = useLocation();

	const { isAuthenticated, setIsAuthenticated } = useContext(AppContext);

	const navLinkClassName = (isActive: boolean) => {
		const activeClassName = "text-black bg-primary";
		const inActiveClassName =
			"hover:bg-gray-200 duration-200 text-gray-400 hover:text-black";

		const defaultClassName =
			"rounded-md text-sm px-5 py-1.5 min-w-fit flex items-center justify-center font-medium";

		const className = `${
			isActive ? activeClassName : inActiveClassName
		} ${defaultClassName}`;

		return className;
	};

	const handleLogout = () => {
		localStorage.removeItem("access_token");
		localStorage.removeItem("code_verifier");

		setIsAuthenticated(false);
	};

	return (
		<header className='sticky top-0 flex items-center justify-between bg-zinc-100 py-5'>
			<nav className='flex items-center space-x-5'>
				{navLinks.map((link, index) => {
					const isActive = location.pathname === link.path;

					return (
						<Link
							key={index}
							to={link.path}
							className={navLinkClassName(isActive)}>
							{link.name}
						</Link>
					);
				})}
			</nav>

			<RenderIf condition={isAuthenticated}>
				<button
					onClick={handleLogout}
					className='flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium duration-200 hover:bg-rose-200 hover:text-rose-500'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.6}
						stroke='currentColor'
						className='mr-1.5 h-5 w-5'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9'
						/>
					</svg>

					<div>Logout</div>
				</button>
			</RenderIf>
		</header>
	);
};

export default Header;
