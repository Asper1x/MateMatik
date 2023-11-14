'use server';

import prisma from '@/lib/prisma';
import ProblemsService from '@/lib/services/problem/problem.service';
import { TestingService } from '@/lib/services/testing/testing.service';
import { revalidatePath } from 'next/cache';
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
	});

	if (!testing) {
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
