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

	getMark(questionsCount: number, answers: string[]) {
		const correctAnswers = this.getCorrect(answers);
		return this.map(correctAnswers, 0, questionsCount, 1, 12);
	},
};
