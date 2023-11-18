import { IStartTesting, ITesting } from './testing.interface';
import prisma from '@/lib/prisma';
import { CalcUtils } from '@/lib/utils/test/CalcUtils';
import { TestUtils } from '@/lib/utils/test/TestUtils';
import { evaluate } from 'mathjs';
import { nanoid } from 'nanoid';
import ProblemsService from '../problem/problem.service';

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
				answers: { push: `${problem}=${answer}&&${evaluate(problem)}` },
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
		const test = await ProblemsService.load(testing.problemId);

		const mark = CalcUtils.getMark(test!.length, testing.answers);
		return prisma.testing.update({ where: { id }, data: { mark } });
	},
};
