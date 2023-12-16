import { IProblem } from '@/lib/services/problem/problem.interface';
import styles from './ProblemPreview.module.scss';
import ProblemTag from '../../tag/ProblemTag';
import ModalButton from './modal-button/ModalButton';
import { getTranslation } from '@/app/[lang]/localize';
import ProblemThumb from '../ProblemThumb/ProblemThumb';

export default async function ProblemPreview({
	problem,
	lang,
}: {
	problem: IProblem;
	lang: string;
}) {
	const placeholders = await getTranslation(
		lang,
		'placeholders.input.username',
		'placeholders.button.submit',
	);

	const content = (
		<>
			<ProblemThumb className={styles.prob_prev} problem={problem} />
			<div className={styles.description}>
				<h1>{problem.title}</h1>
				<p>{problem.publicId}</p>
			</div>
		</>
	);

	return (
		<div className={styles.card_preview}>
			<ModalButton
				placeholders={placeholders}
				problemId={problem.publicId}
			>
				{content}
			</ModalButton>
			{content}
		</div>
	);
}

/*
				<div className={styles.tags_container}>
					{problem.tagNames.map((tag) => (
						<ProblemTag lang={lang} tag={tag} key={tag} />
					))}
				</div>
				*/
