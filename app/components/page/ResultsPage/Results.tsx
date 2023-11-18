import ILocale from '@/app/types/props/lang/ILocale';
import styles from './Results.module.scss';
import clsx from 'clsx';
import { getTranslation } from '@/app/[lang]/localize';
import Entities from './Entities';

export default async function Results({ params }: { params: ILocale }) {
	const [COMPLETEDBY, TIMEELAPSED, TASKNAME, MARK] = await getTranslation(
		params.lang,
		'pages.results.completedBy',
		'pages.results.timeElapsed',
		'pages.results.taskName',
		'pages.results.mark',
	);

	return (
		<table className={clsx('container', styles.table)}>
			<tbody>
				<tr className={styles.upper}>
					<th>{COMPLETEDBY}</th>
					<th>{TASKNAME}</th>
					<th>{TIMEELAPSED}</th>
					<th>{MARK}</th>
				</tr>
				<Entities />
			</tbody>
		</table>
	);
}
