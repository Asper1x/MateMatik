import { IStartTesting, ITesting } from './testing.interface';
import prisma from '@/lib/prisma';
import { evaluate } from 'mathjs';
import { nanoid } from 'nanoid';

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
		return <ITesting>(
			await prisma.testing.findUnique({
				where: { id },
				include: { problem: include },
			})
		);
	},

	sendAnswer(id: string, problem: string, answer: string) {
		return prisma.testing.update({
			where: { id },
			data: {
				answers: { push: `${problem}=${answer}&&${evaluate(problem)}` },
			},
		});
	},
};
