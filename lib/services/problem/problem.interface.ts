export interface IGetProblem {
	take: number;
	page: number;
	prompt?: {
		publicId?: string;
		tagNames?: string[];
		title?: string;
	};
}

export interface ICreateProblem {
	title: string;
	description: string;
	tagNames: string[];
	maxTime?: number;
}

export interface IProblem extends ICreateProblem {
	publicId: string;
}

export interface ITest {
	floor: number;
	ceil: number;
	vars: string[];
	equation: string;
}
