import clsx from 'clsx';
import styles from './Finished.module.scss';
import TestingNavbar from '../../nav/TestingNavBar';
import { ITesting } from '@/lib/services/testing/testing.interface';
import { DateUtils } from '@/lib/utils/test/DateUtils';
import ProblemThumb from '../../ui/previews/ProblemThumb/ProblemThumb';
import ProblemsService from '@/lib/services/problem/problem.service';
import { getDictionary, getTranslation } from '@/app/[lang]/localize';
import MathFormatter from '../../ui/math-formatter/MathFormatter';

function map(
	x: number,
	in_min: number,
	in_max: number,
	out_min: number,
	out_max: number,
) {
	return Math.ceil(
		((x - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min,
	);
}

export default async function Finished({
	testing,
	test,
	lang,
}: {
	testing: ITesting;
	test: string[];
	lang: string;
}) {
	const [[problem], [HOSTNAME]] = await Promise.all([
		ProblemsService.get({
			take: 1,
			page: 1,
			prompt: { publicId: testing.problemId },
		}),
		getTranslation(lang, 'host.name', 'errors.testInProgress'),
	]);

	const correctAnswers = testing.answers.filter((answer) => {
		const aNum: string = answer.substring(
			answer.indexOf('=') + 1,
			answer.lastIndexOf('&&'),
		);
		return aNum == answer.split('&&')[1];
	}).length;

	const timeElapsed = DateUtils.diff(testing.updated, testing.started);

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
				startedDate={testing.started}
				hostName={HOSTNAME}
				stats={{
					total: test.length,
					done: testing.answers.length,
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
					<p>{`${Translated.correctAnswers}: ${correctAnswers}`}</p>
					<p>{`${Translated.mark}: ${map(
						correctAnswers,
						0,
						test.length,
						1,
						12,
					)}`}</p>
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
