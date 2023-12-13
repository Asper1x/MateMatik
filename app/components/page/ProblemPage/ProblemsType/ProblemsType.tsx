import { NumberType } from '@/lib/utils/test/TestUtils';
import styles from './ProblemsType.module.scss';
import { IProblem } from '@/lib/services/problem/problem.interface';
import ProblemPreview from '@/app/components/ui/previews/ProblemPreview/ProblemPreview';
import { getTranslation } from '@/app/[lang]/localize';

export default async function ProblemsType({
	lang,
	type,
	problems,
}: {
	lang: string;
	type: NumberType;
	problems: IProblem[];
}) {
	const [NUM_TYPE] = await getTranslation(
		lang,
		`types.num.${type.toString()}`,
	);
	const filtered = problems.filter(
		(problem) => problem.tagNames.indexOf(type.toString()) >= 0,
	);

	return (
		<div className={styles.problems_list}>
			<div className={styles.problems_heading}>{NUM_TYPE}</div>
			{filtered.map((problem) => (
				<ProblemPreview
					key={problem.publicId}
					problem={problem}
					lang={lang}
				/>
			))}
		</div>
	);
}
