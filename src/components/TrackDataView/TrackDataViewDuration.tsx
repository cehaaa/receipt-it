import React from "react";

type TrackDataViewDuration = {
	duration: string;
};

const TrackDataViewDuration: React.FC<TrackDataViewDuration> = ({
	duration,
}) => {
	return (
		<div className='text-sm text-neutral-gray line-clamp-1'>{duration}</div>
	);
};

export default TrackDataViewDuration;
