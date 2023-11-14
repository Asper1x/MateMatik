const SECOND = 1_000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export interface TimeStamp {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

export const DateUtils = {
	diff(first: Date, second: Date) {
		const timespan = first.getTime() - second.getTime();

		return <TimeStamp>{
			days: Math.floor(timespan / DAY),
			hours: Math.floor((timespan / HOUR) % 24),
			minutes: Math.floor((timespan / MINUTE) % 60),
			seconds: Math.floor((timespan / SECOND) % 60),
		};
	},
};
