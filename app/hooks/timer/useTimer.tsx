import { useState, useEffect } from 'react';

const SECOND = 1_000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export default function useTimer(
	deadline: Date,
	start = Date.now(),
	interval = SECOND,
	backward?: boolean,
) {
	const [timespan, setTimespan] = useState(start - deadline.getTime());

	if (interval >= 0) {
		useEffect(() => {
			const intervalId = setInterval(() => {
				setTimespan(
					(_timespan) => _timespan + interval * (backward ? -1 : 1),
				);
			}, interval);

			return () => {
				clearInterval(intervalId);
			};
		}, [interval]);
	}

	return {
		days: Math.floor(timespan / DAY),
		hours: Math.floor((timespan / HOUR) % 24),
		minutes: Math.floor((timespan / MINUTE) % 60),
		seconds: Math.floor((timespan / SECOND) % 60),
	};
}
