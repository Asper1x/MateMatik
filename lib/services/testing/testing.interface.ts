export interface IStartTesting {
	userName: string;
	problemId: string;
}

export interface ITesting extends IStartTesting {
	id: string;
	answers: string[];
	started: Date;
	updated: Date;
}
