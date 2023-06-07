import { useContext } from "react";

import AppContext from "../../context/AppContext";

import RenderIf from "../RenderIf/RenderIf";
import NavLink from "../NavLink/NavLink";
import LogoutButton from "../LogoutButton/LogoutButton";

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
	{
		path: "/receipt",
		name: "Receipt",
	},
];

const Header = () => {
	const { isAuthenticated } = useContext(AppContext);

	return (
		<header className='sticky top-0 z-50 flex items-center justify-between bg-black py-5'>
			<nav className='flex items-center'>
				{navLinks.map((link, index) => {
					return <NavLink key={index} name={link.name} path={link.path} />;
				})}
			</nav>

			<div className='hidden sm:block'>
				<RenderIf condition={isAuthenticated}>
					<LogoutButton />
				</RenderIf>
			</div>
		</header>
	);
};

export default Header;
