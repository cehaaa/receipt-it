import React from "react";

type ContainerProps = {
	children?: React.ReactNode;
	className?: string;
};

const Container: React.FC<ContainerProps> = ({ children, className }) => {
	return (
		<div
			className={`mx-auto w-full px-5 sm:w-10/12 sm:px-0 lg:w-5/12 ${
				className ? className : ""
			}`}>
			{children}
		</div>
	);
};

export default Container;
