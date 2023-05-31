import React from "react";

import { Link } from "react-router-dom";

import RenderIf from "../RenderIf/RenderIf";

type TrackDataViewAlbumProps = {
	albumName: string;
	href?: string;
};

const TrackDataViewAlbum: React.FC<TrackDataViewAlbumProps> = ({
	albumName,
	href = "",
}) => {
	return (
		<div>
			<RenderIf condition={href !== ""}>
				<Link
					to={href}
					className='w-[150px] flex-shrink-0 cursor-pointer text-sm text-neutral-gray line-clamp-1 hover:underline'>
					{albumName}
				</Link>
			</RenderIf>

			<RenderIf condition={href === ""}>
				<div className='w-[150px] flex-shrink-0 cursor-pointer text-sm text-neutral-gray line-clamp-1 hover:underline'>
					{albumName}
				</div>
			</RenderIf>
		</div>
	);
};

export default TrackDataViewAlbum;
