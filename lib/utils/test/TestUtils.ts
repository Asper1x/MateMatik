import { ITest } from '@/lib/services/problem/problem.interface';

export enum NumberType {
	Natural = 'n',
	Intenger = 'z',
	Rational = 'q',
}

interface TestMeta {
	floor: number;
	ceil: number;
	increasing?: boolean;
}

type VarsValue = Record<string, number>;

export const TestUtils = {
	getRandomArbitrary({ floor: min, ceil: max }: TestMeta, isFloat?: boolean) {
		min = Math.ceil(min ?? -1000);
		max = Math.floor(max ?? 1000);
		const float = Math.random() * (max - min) + min;

		switch (isFloat == true) {
			case true:
				return Number(float.toFixed(1));
			case false:
				return Math.floor(float);
		}
	},

	generateNumber(name: string, meta: TestMeta) {
		let generated: number;
		const type: NumberType = name[0] as NumberType;
		switch (type) {
			case NumberType.Natural:
				generated = this.getRandomArbitrary({
					...meta,
					floor: meta.floor <= 0 ? 0 : meta.floor,
				});
				break;

			case NumberType.Intenger:
				generated = this.getRandomArbitrary(meta);
				break;

			case NumberType.Rational:
				generated = this.getRandomArbitrary(meta, true);
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
			if (meta.increasing == true) {
				meta = {
					...meta,
					ceil:
						x.indexOf('1') >= 0
							? Math.floor(generated[x] / (vars.length - 1))
							: generated[x],
				};
			}
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
		const meta = {
			floor: test.floor,
			ceil: test.ceil,
			increasing: test.increasing,
		};
		const equation = test.equation;

		const genVars = this.generateVars(vars, meta);
		return this.replaceVars(genVars, equation);
	},
};
