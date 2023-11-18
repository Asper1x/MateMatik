import { IProblem } from '../problem/problem.interface';

export interface IStartTesting {
	userName: string;
	problemId: string;
}

export interface ITesting extends IStartTesting {
	id: string;
	answers: string[];
	updated: Date;
	started?: Date;
	problem?: IProblem;
	mark?: number;
}
