'use server';

import prisma from '@/lib/prisma';
import ProblemsService from '@/lib/services/problem/problem.service';
import { TestingService } from '@/lib/services/testing/testing.service';
import { redirect } from 'next/navigation';

export async function AStartTesting(problemId: string, formData: FormData) {
	const userName = formData.get('username')?.toString();

	if (userName) {
		const testing = await TestingService.startTesting({
			userName,
			problemId,
		});
		redirect(`testing/${testing.id}`);
	}
}
export async function ASendAnswer(
	testingId: string,
	question: string,
	formData: FormData,
) {
	const testing = await prisma.testing.findUnique({
		where: { id: testingId },
		include: { problem: true },
	});

	if (
		!testing ||
		!testing.started ||
		(testing.problem.maxTime &&
			testing.started.getTime() + testing.problem.maxTime * 1000 <
				Date.now())
	) {
		return;
	}

	const test = await ProblemsService.load(testing.problemId);

	const answer = formData.get('answer')?.toString();

	if (
		test &&
		testing.answers.length < test.length &&
		answer !== undefined &&
		!!parseFloat(answer)
	)
		await TestingService.sendAnswer(testingId, question, answer);
	else if (test && testing.answers.length >= test.length)
		redirect(`${testingId}`);
}

export async function ARegister(id: string) {
	return prisma.testing.updateMany({
		where: {
			id,
			started: { isSet: false },
		},
		data: {
			started: new Date(),
		},
	});
}

export async function AGetTesting(ids: string[]) {
	return prisma.testing.findMany({
		where: { id: { in: ids } },
		include: { problem: true },
	});
}
