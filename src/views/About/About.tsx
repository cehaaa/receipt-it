import { Link } from "react-router-dom";

const About = () => {
	return (
		<>
			<div className='font-serif text-2xl font-medium text-black'>About</div>

			<div className='text-gray-500'>
				<div className='mt-2'>
					Welcome to{" "}
					<span className='font-serif text-black underline'>AlbumMemo</span>,
					the ultimate music tool that presents your top 10 most-played tracks
					from the past month, last 6 months, and all-time in a unique and
					captivating Receipt-like format. With AlbumMemo, you can dive into
					your music journey and explore your favorite songs like never before.
				</div>

				{/* <p className='mt-4'>
					At <span className='font-serif text-black underline'>AlbumMemo</span>,
					we recognize that music holds a special place in your heart, and it's
					more than just a collection of melodies. It's a reflection of your
					soul and a source of inspiration. That's why we've developed an
					innovative solution that analyzes your Spotify listening data, curates
					your most beloved tracks, and presents them to you in an engaging and
					visually appealing Receipt-like layout.
				</p> */}
			</div>

			<div className='mt-4'>
				<Link
					to='/'
					className='flex w-fit items-center justify-center rounded-md bg-primary px-5 py-1.5 text-sm font-medium text-black'>
					Start exploring
				</Link>
			</div>
		</>
	);
};

export default About;
