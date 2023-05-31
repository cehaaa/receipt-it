import React from "react";

type TrackDataViewContainerProps = {
	children?: React.ReactNode;
};

const TrackListContainer: React.FC<TrackDataViewContainerProps> = ({
	children,
}) => {
	return (
		<div className='group flex cursor-default items-center justify-between overflow-hidden rounded-md bg-black-secondary pl-0 duration-200 hover:bg-black-secondary-hover sm:pr-4'>
			{children}
		</div>
	);
};

export default TrackListContainer;
