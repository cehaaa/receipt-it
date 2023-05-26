import React from "react";

import RenderIf from "../RenderIf/RenderIf";

import { Playlist } from "../../interfaces/CurrentUserPlaylistInterface";

type UserPlaylistCardProps = {
	playlist: Playlist;
};

const UserPlaylistCard: React.FC<UserPlaylistCardProps> = ({ playlist }) => {
	return (
		<div className='w-[216px] flex-shrink-0 overflow-hidden rounded-md bg-white p-2'>
			<div className='h-[200px] w-[200px] overflow-hidden rounded'>
				<RenderIf condition={playlist.images.length >= 1}>
					<img
						className='h-full w-full object-cover duration-200 hover:scale-110'
						src={playlist.images.length > 0 ? playlist.images[0].url : ""}
						alt='playlist cover'
					/>
				</RenderIf>

				<RenderIf condition={playlist.images.length <= 0}>
					<div className='flex h-full w-full items-center justify-center bg-gray-400'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='h-10 w-10 text-white'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z'
							/>
						</svg>
					</div>
				</RenderIf>
			</div>

			<div className='pt-2 text-sm'>
				<div className=' text-base font-medium text-gray-800 line-clamp-1'>
					{playlist.name}
				</div>
				<div>{playlist.owner.display_name}</div>
			</div>
		</div>
	);
};

export default UserPlaylistCard;
