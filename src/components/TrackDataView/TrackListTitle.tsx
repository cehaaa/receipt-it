import React from "react";

import { Link } from "react-router-dom";

import RenderIf from "../RenderIf/RenderIf";

type TrackDataViewTitleProps = {
	number?: number;
	isShowNumber?: boolean;

	trackImage: string;
	trackImageAlt: string;

	trackTitle: string;
	trackHref?: string;

	artist?: string;
	artistHref?: string;
};

const TrackDataViewTitle: React.FC<TrackDataViewTitleProps> = ({
	number,
	isShowNumber = true,

	trackImage,
	trackImageAlt,

	trackTitle,
	trackHref = "",

	artist,
	artistHref = "",
}) => {
	return (
		<div className='flex w-[350px] flex-shrink-0 items-center'>
			<RenderIf condition={isShowNumber}>
				<div className='ml-0 mr-3 flex w-[10px] flex-shrink-0 justify-center sm:mx-3'>
					<div className='text-neutral-gray'>{number}</div>
				</div>
			</RenderIf>

			<div className='mr-4 h-16 w-16 flex-shrink-0 overflow-hidden bg-gray-800'>
				<img src={trackImage} alt={trackImageAlt} />
			</div>

			<div>
				<RenderIf condition={trackHref === ""}>
					<div className='cursor-pointer line-clamp-1 hover:underline'>
						{trackTitle}
					</div>
				</RenderIf>

				<RenderIf condition={trackHref !== ""}>
					<Link
						to={trackHref}
						className='cursor-pointer line-clamp-1 hover:underline'>
						{trackTitle}
					</Link>
				</RenderIf>

				<RenderIf condition={artistHref === ""}>
					<div className='cursor-pointer text-sm text-neutral-gray hover:underline'>
						{artist}
					</div>
				</RenderIf>

				<RenderIf condition={artistHref !== ""}>
					<Link
						to={artistHref}
						className='cursor-pointer text-sm text-neutral-gray hover:underline'>
						{artist}
					</Link>
				</RenderIf>
			</div>
		</div>
	);
};

export default TrackDataViewTitle;
