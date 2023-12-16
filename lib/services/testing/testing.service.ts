import { IStartTesting, ITesting } from './testing.interface';
import prisma from '@/lib/prisma';
import { CalcUtils } from '@/lib/utils/test/CalcUtils';
import { nanoid } from 'nanoid';
import ProblemsService from '../problem/problem.service';
import Mexp from 'math-expression-evaluator';

const mexp = new Mexp();

export const TestingService = {
	async startTesting(data: IStartTesting) {
		return <ITesting>await prisma.testing.create({
			data: {
				...data,
				id: nanoid(),
				problem: { connect: { publicId: data.problemId } },
				problemId: undefined,
			},
		});
	},

	async getTesting(id: string, include = false) {
		const testing = <ITesting>await prisma.testing.findUnique({
			where: { id },
			include: { problem: include },
		});

		return testing;
	},

	sendAnswer(id: string, problem: string, answer: string) {
		return prisma.testing.update({
			where: { id },
			data: {
				answers: {
					push: `${problem}=${answer}&&${Number(
						//@ts-ignore
						mexp.eval(problem),
					).toFixed(1)}`,
				},
			},
		});
	},

	async endTesting(id: string) {
		const testing = await prisma.testing.findUnique({ where: { id } });
		if (!testing) {
			return;
		} else if (testing.mark) {
			return testing;
		}

		const mark = CalcUtils.getMark(testing.answers);
		return prisma.testing.update({ where: { id }, data: { mark } });
	},
};
