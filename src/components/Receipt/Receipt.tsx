import React, { useContext, useRef } from "react";

import AppContext from "../../context/AppContext";

import { TimeRange } from "../../services/useUsersService";

import { getTodayDate } from "../../utils/time";
import msToReadableTime from "../../utils/msToReadableTime";
import ReceiptSaveButton from "./ReceiptSaveButton";

type ReceiptProps = {
	selectedTimeRange: TimeRange;
};

const Receipt: React.FC<ReceiptProps> = ({ selectedTimeRange }) => {
	const receiptContainerRef = useRef<HTMLDivElement>(null);

	const {
		userTopTracksShortTerm,
		userTopTracksMediumTerm,
		userTopTracksLongTerm,

		currentUserProfile,
	} = useContext(AppContext);

	const { date, day, month, year } = getTodayDate();

	const topTracksMap = {
		short_term: userTopTracksShortTerm,
		medium_term: userTopTracksMediumTerm,
		long_term: userTopTracksLongTerm,
	};

	const totalDuration = topTracksMap[selectedTimeRange].items.reduce(
		(acc, curr) => {
			return acc + curr.duration_ms;
		},
		0
	);

	return (
		<>
			<div
				ref={receiptContainerRef}
				className='min-h-[600px] w-full bg-wrinkled-paper object-cover px-2 py-6 font-mono text-sm text-black sm:w-[400px]'>
				<div className='text-center'>
					<div className='text-xl font-bold'>ReceiptIt</div>

					<div>
						{selectedTimeRange === TimeRange.ShortTerm
							? "Your last month top 10 tracks"
							: selectedTimeRange === TimeRange.MediumTerm
							? "Your last 6 month top 10 tracks"
							: "Your all time top 10 tracks"}
					</div>
				</div>

				<div className='mt-5 uppercase'>
					<div>order #0001 for {currentUserProfile.display_name}</div>
					<div>
						{day}, {date} {month} {year}
					</div>
				</div>

				<div className='mt-2'>
					<table className='w-full uppercase'>
						<thead className='border-y-2 border-dashed border-gray-600 font-bold'>
							<tr>
								<td className='border-spacing-x-10'>qty</td>
								<td>item</td>
								<td className='text-right'>amt</td>
							</tr>
						</thead>
						<tbody className=' my-6 border-spacing-y-5 border-b-2 border-dashed border-gray-600'>
							{topTracksMap[selectedTimeRange].items &&
								topTracksMap[selectedTimeRange].items.map((item, index) => {
									return (
										<tr key={index}>
											<td>{(index + 1).toString().padStart(2, "0")}</td>
											<td>{item.name}</td>
											<td className='text-right'>
												{msToReadableTime(item.duration_ms)}
											</td>
										</tr>
									);
								})}
						</tbody>
						<tfoot className=' border-b-2 border-dashed border-gray-600'>
							<tr>
								<td colSpan={2} className='font-bold'>
									item count
								</td>
								<td className='text-right'>10</td>
							</tr>
							<tr>
								<td colSpan={2} className='font-bold'>
									total
								</td>
								<td className='text-right'>
									{msToReadableTime(totalDuration)}
								</td>
							</tr>
						</tfoot>
					</table>
				</div>

				<div className='mt-2 uppercase'>
					<div>card#: ******8710</div>
					<div>auth code: 10891210</div>
					<div>card holder: {currentUserProfile.display_name}</div>
				</div>

				<div className='mt-5 text-center'>
					<div>
						Thank you for listening! We hope you enjoy as much as we do.
					</div>
					<div>receipt-it.vercel.app</div>
				</div>
			</div>

			<div className='mt-5'>
				<ReceiptSaveButton receiptContainerRef={receiptContainerRef} />
			</div>
		</>
	);
};

export default Receipt;
