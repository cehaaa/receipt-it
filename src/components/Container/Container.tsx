import React from "react";

type ContainerProps = {
	children?: React.ReactNode;
	className?: string;
};

const Container: React.FC<ContainerProps> = ({ children, className }) => {
	return (
		<div className={`mx-auto w-5/12 ${className ? className : ""}`}>
			{children}
		</div>
	);
};

export default Container;
