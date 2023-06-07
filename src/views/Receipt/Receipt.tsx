import { useCallback, useContext, useEffect, useState, useRef } from "react";
import { toPng } from "html-to-image";

import AppContext from "../../context/AppContext";

import useUsersService, { TimeRange } from "../../services/useUsersService";

import msToReadableTime from "../../utils/msToReadableTime";

import AppButton from "../../components/AppButton/AppButton";

const Receipt = () => {
	const {
		userTopTracksShortTerm,
		userTopTracksMediumTerm,
		userTopTracksLongTerm,

		setUserTopTracksShortTerm,
		setUserTopTracksMediumTerm,
		setUserTopTracksLongTerm,

		currentUserProfile,
		setCurrentUserProfile,
	} = useContext(AppContext);

	const { getUserTopTracks, getCurrentUserProfile } = useUsersService();

	const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>(
		TimeRange.ShortTerm
	);
	const receiptContainerRef = useRef<HTMLDivElement>(null);

	const topTracksMap = {
		short_term: userTopTracksShortTerm,
		medium_term: userTopTracksMediumTerm,
		long_term: userTopTracksLongTerm,
	};

	const fetchUserTopTracks = useCallback(async () => {
		const response = await getUserTopTracks({
			time_range: selectedTimeRange,
			limit: 10,
		});
		const data = await response.json();

		if (selectedTimeRange === TimeRange.ShortTerm) {
			setUserTopTracksShortTerm(data);
		}

		if (selectedTimeRange === TimeRange.MediumTerm) {
			setUserTopTracksMediumTerm(data);
		}

		if (selectedTimeRange === TimeRange.LongTerm) {
			setUserTopTracksLongTerm(data);
		}
	}, [selectedTimeRange]);

	const fetchUserCurrentProfile = useCallback(async () => {
		const response = await getCurrentUserProfile();
		const data = await response.json();

		setCurrentUserProfile(data);
	}, []);

	const saveAsImage = useCallback(async () => {
		if (receiptContainerRef.current === null) return;

		const dataUrl = await toPng(receiptContainerRef.current, {
			cacheBust: true,
		});

		const link = document.createElement("a");
		link.download = "receipt.png";
		link.href = dataUrl;

		link.click();
	}, []);

	useEffect(() => {
		fetchUserCurrentProfile();
	}, [fetchUserCurrentProfile]);

	useEffect(() => {
		fetchUserTopTracks();
	}, [selectedTimeRange, fetchUserTopTracks]);

	return (
		<div className='flex flex-col justify-between sm:flex-row'>
			<div className='flex flex-row sm:flex-col sm:space-y-5'>
				<AppButton
					type={
						selectedTimeRange === TimeRange.ShortTerm ? "primary" : "secondary"
					}
					onClick={() => setSelectedTimeRange(TimeRange.ShortTerm)}>
					4 Weeks
				</AppButton>
				<AppButton
					type={
						selectedTimeRange === TimeRange.MediumTerm ? "primary" : "secondary"
					}
					onClick={() => setSelectedTimeRange(TimeRange.MediumTerm)}>
					6 Month
				</AppButton>
				<AppButton
					type={
						selectedTimeRange === TimeRange.LongTerm ? "primary" : "secondary"
					}
					onClick={() => setSelectedTimeRange(TimeRange.LongTerm)}>
					All time
				</AppButton>
			</div>

			<div className='mt-4 sm:mt-0'>
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
						<div>wednesday, 7 june 2023</div>
					</div>

					<div className='mt-2'>
						<table className='w-full uppercase'>
							<thead className='border-y-2 border-dashed border-gray-600 font-bold'>
								<tr>
									<td className='border-spacing-x-10'>qty</td>
									<td>item</td>
									<td>amt</td>
								</tr>
							</thead>
							<tbody className=' my-6 border-spacing-y-5 border-b-2 border-dashed border-gray-600'>
								{topTracksMap[selectedTimeRange].items &&
									topTracksMap[selectedTimeRange].items.map((item, index) => {
										return (
											<tr key={index}>
												<td>{(index + 1).toString().padStart(2, "0")}</td>
												<td>{item.name}</td>
												<td>{msToReadableTime(item.duration_ms)}</td>
											</tr>
										);
									})}
							</tbody>
							<tfoot className=' border-b-2 border-dashed border-gray-600'>
								<tr>
									<td colSpan={2} className='font-bold'>
										item count
									</td>
									<td>10</td>
								</tr>
								<tr>
									<td colSpan={2} className='font-bold'>
										total
									</td>
									<td>sum</td>
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
					<AppButton
						type='primary'
						onClick={saveAsImage}
						className='w-full py-2 sm:w-fit'>
						Save as Image
					</AppButton>
				</div>
			</div>
		</div>
	);
};

export default Receipt;
