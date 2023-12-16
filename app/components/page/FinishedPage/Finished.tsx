import clsx from 'clsx';
import styles from './Finished.module.scss';
import TestingNavbar from '../../nav/TestingNavBar';
import { ITesting } from '@/lib/services/testing/testing.interface';
import { DateUtils } from '@/lib/utils/test/DateUtils';
import ProblemThumb from '../../ui/previews/ProblemThumb/ProblemThumb';
import ProblemsService from '@/lib/services/problem/problem.service';
import { getDictionary, getTranslation } from '@/app/[lang]/localize';
import MathFormatter from '../../ui/math-formatter/MathFormatter';
import { TestingService } from '@/lib/services/testing/testing.service';
import { CalcUtils } from '@/lib/utils/test/CalcUtils';

export default async function Finished({
	testing,
	test,
	lang,
}: {
	testing: ITesting;
	test: string[];
	lang: string;
}) {
	const [testingMark, [problem], [HOSTNAME]] = await Promise.all([
		TestingService.endTesting(testing.id),
		ProblemsService.get({
			take: 1,
			page: 1,
			prompt: { publicId: testing.problemId },
		}),
		getTranslation(lang, 'host.name', 'errors.testInProgress'),
	]);

	const timeElapsed = DateUtils.diff(
		testing.updated,
		testing.started ?? new Date(),
	);

	let Translated = await getDictionary(lang);
	Translated = Translated.pages.finished;

	const answers: React.ReactNode[] = testing.answers.map((answer) => (
		<>
			<MathFormatter
				className={styles.user_answer}
				expression={answer.split('&&')[0]}
			/>
			<div className={styles.solution}>{answer.split('&&')[1]}</div>
		</>
	));

	return (
		<>
			<TestingNavbar
				startedDate={testing.started ?? new Date()}
				hostName={HOSTNAME}
				stats={{
					total: test.length,
					done: testing.answers.length,
					mark: testingMark!.mark ?? 0,
				}}
				className={styles.finished_nav}
				timeStamp={timeElapsed}
			/>
			<div className={clsx('container', styles.finished)}>
				<div className={styles.information}>
					<h1>{problem.title}</h1>
					<h3>{problem.description}</h3>
					<p>{`${Translated.completedBy}: ${testing.userName}`}</p>
					<p>
						{`${Translated.timeElapsed}: `}
						{timeElapsed.hours.toString().padStart(2, '0')}:
						{timeElapsed.minutes.toString().padStart(2, '0')}:
						{timeElapsed.seconds.toString().padStart(2, '0')}
					</p>
					<p>{`${Translated.numberOfTasks}: ${test.length}`}</p>
					<p>{`${Translated.correctAnswers}: ${CalcUtils.getCorrect(
						testing.answers,
					)}`}</p>
					<p>{`${Translated.mark}: ${testingMark!.mark}`}</p>
					<div className={styles.answers}>
						{answers.map((answer, index) => (
							<div key={`A${index}`} className={styles.answer}>
								{answer}
							</div>
						))}
					</div>
				</div>
				<ProblemThumb problem={problem} className={styles.thumb} />
			</div>
		</>
	);
}
