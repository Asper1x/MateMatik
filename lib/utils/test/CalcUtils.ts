export const CalcUtils = {
	map(
		x: number,
		in_min: number,
		in_max: number,
		out_min: number,
		out_max: number,
	) {
		return Math.ceil(
			((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min,
		);
	},

	getCorrect(answers: string[]) {
		return answers.filter((answer) => {
			const aNum: string = answer.substring(
				answer.indexOf('=') + 1,
				answer.lastIndexOf('&&'),
			);
			return aNum == answer.split('&&')[1];
		}).length;
	},

	getMark(answers: string[]) {
		return (
			this.getCorrect(answers) +
			(answers.length - this.getCorrect(answers)) * -1
		);
	},

	round(n: number) {
		if (n % 1 !== 0) {
			return +n.toFixed(1);
		} else {
			return Number(n);
		}
	},
};
