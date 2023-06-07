import React from "react";

type AppButtonProps = {
	children: React.ReactNode;
	className?: string;

	onClick?: () => void;

	type?: "primary" | "secondary";

	isLoading?: boolean;
};

const AppButton: React.FC<AppButtonProps> = ({
	children,
	className,
	onClick,
	type = "primary",
	isLoading = false,
}) => {
	const appButtonClassName = () => {
		const primaryClassName = `bg-primary text-black hover:bg-primary-hover ${
			isLoading && "cursor-wait opacity-60"
		}`;

		const secondaryClassName =
			"bg-transparent text-neutral-gray hover:underline";

		const assemble = `${
			type === "primary" ? primaryClassName : secondaryClassName
		} rounded-md sm:px-5 sm:py-1.5 text-xs font-medium duration-200 text-sm sm:text-base px-3 py-1 `;

		return assemble;
	};

	return (
		<button
			disabled={isLoading}
			className={`${appButtonClassName()} ${className}`}
			onClick={onClick}>
			{children}
		</button>
	);
};

export default AppButton;
