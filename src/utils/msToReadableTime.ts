export const msToReadableTime = (ms: number): string => {
	const seconds = Math.floor(ms / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);

	const readableSeconds = seconds % 60;
	const readableMinutes = minutes % 60;
	const readableHours = hours % 60;

	const stringHours = readableHours.toString().padStart(2, "0");
	const stringMinutes = readableMinutes.toString().padStart(2, "0");
	const stringSeconds = readableSeconds.toString().padStart(2, "0");

	const assemble = () => {
		if (stringHours === "00") {
			return `${stringMinutes}:${stringSeconds}`;
		} else {
			return `${stringHours}:${stringMinutes}:${stringSeconds}`;
		}
	};

	return assemble();
};

export default msToReadableTime;
