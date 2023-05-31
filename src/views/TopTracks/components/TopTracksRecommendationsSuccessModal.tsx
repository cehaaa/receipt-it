import React, { Dispatch, SetStateAction } from "react";

import { Link } from "react-router-dom";

import AppButton from "../../../components/AppButton/AppButton";

type TopTracksRecommendationsSuccessModalProps = {
	setIsSuccessModalOpen: Dispatch<SetStateAction<boolean>>;
	createdPlaylistUrl: string;
};

export const TopTracksRecommendationsSuccessModal: React.FC<
	TopTracksRecommendationsSuccessModalProps
> = ({ setIsSuccessModalOpen, createdPlaylistUrl }) => {
	return (
		<div className='fixed left-0 top-0 z-50 flex min-h-screen w-full items-center justify-center bg-gray-800 bg-opacity-30'>
			<div className='mx-5 w-full rounded-md bg-white p-3 text-black sm:w-4/12'>
				<div className='text-xl font-semibold'>Success adding to playlist</div>

				<div className='mt-5 text-sm text-gray-500'>
					Your playlist has been created and added to your Spotify account. You
					can now go to your Spotify account and check it out.
				</div>

				<div className='mt-10 flex flex-row-reverse'>
					<Link
						target='_blank'
						to={createdPlaylistUrl}
						className='rounded-md bg-primary px-5 py-1.5 text-sm font-medium text-black duration-200 hover:bg-primary-hover'>
						Go to playlist
					</Link>

					<AppButton
						type='secondary'
						onClick={() => setIsSuccessModalOpen(false)}>
						Close
					</AppButton>
				</div>
			</div>
		</div>
	);
};
