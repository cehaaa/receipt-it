import React, { useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

type NavLinkProps = {
	path: string;
	name: string;
};

const NavLink: React.FC<NavLinkProps> = ({ path, name }) => {
	const location = useLocation();

	const checkIsActive = useCallback(
		(path: string) => {
			if (path === "/") {
				const childrenMap = {
					"/top-tracks": true,
					"/top-artists": true,
					"/top-tracks/short-term": true,
					"/top-tracks/medium-term": true,
					"/top-tracks/all-time": true,
					"/top-tracks/recommendations": true,
				};

				const pathname = location.pathname;

				if ((childrenMap as any)[pathname]) return true;
			}

			return path === location.pathname;
		},
		[location.pathname]
	);

	const navLinkClassName = useCallback((isActive: boolean) => {
		const activeClassName =
			"text-black bg-primary hover:bg-primary-hover duration-200";

		const inActiveClassName = "hover:underline text-neutral-gray";

		const defaultClassName =
			"rounded-md sm:text-sm text-xs sm:px-5 sm:py-1.5 px-3 py-1 min-w-fit flex items-center justify-center font-medium ";

		const assemble = `${
			isActive ? activeClassName : inActiveClassName
		} ${defaultClassName}`;

		return assemble;
	}, []);

	return (
		<Link to={path} className={navLinkClassName(checkIsActive(path))}>
			{name}
		</Link>
	);
};

export default NavLink;
