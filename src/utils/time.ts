export const days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

export const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export const getTodayDate = () => {
	const today = new Date();

	const date = today.getDate();
	const day = today.getDay();
	const month = today.getMonth();
	const year = today.getFullYear();

	return {
		date,
		day: days[day],
		month: months[month],
		year,
	};
};
