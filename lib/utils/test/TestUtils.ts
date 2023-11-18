import { ITest } from '@/lib/services/problem/problem.interface';

enum NumberType {
	Natural = 'n',
	Intenger = 'z',
	Rational = 'q',
}

interface TestMeta {
	floor?: number;
	ceil?: number;
}

type VarsValue = Record<string, number>;

export const TestUtils = {
	getRandomArbitrary({ floor: min, ceil: max }: TestMeta) {
		min = Math.ceil(min ?? -1000);
		max = Math.floor(max ?? 1000);
		return Math.floor(Math.random() * (max - min) + min);
	},

	generateNumber(name: string, meta: TestMeta) {
		let generated: number;
		const type: NumberType = name[0] as NumberType;
		switch (type) {
			case NumberType.Natural:
				generated = this.getRandomArbitrary({ ...meta, floor: 0 });
				break;

			case NumberType.Intenger:
				generated = this.getRandomArbitrary(meta);
				break;

			case NumberType.Rational:
				generated = this.getRandomArbitrary(meta);
				break;
		}

		return generated;
	},

	generateVars(vars: string[], meta: TestMeta) {
		const generated: VarsValue = {};
		for (const x of vars) {
			if (x in generated) {
				continue;
			}
			generated[x] = this.generateNumber(x, meta);
		}

		return generated;
	},

	replaceVars(vars: VarsValue, equation: string) {
		let newEquation = equation.toString();
		for (const x in vars) {
			newEquation = newEquation.replaceAll(x, vars[x].toString());
		}
		return newEquation;
	},

	autoGen(test: ITest) {
		const vars = test.vars;
		const meta = { floor: test.floor, ceil: test.ceil };
		const equation = test.equation;

		const genVars = this.generateVars(vars, meta);
		return this.replaceVars(genVars, equation);
	},
};
