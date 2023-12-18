import ILocale from '@/app/types/props/lang/ILocale';
import styles from './Results.module.scss';
import clsx from 'clsx';
import { getTranslation } from '@/app/[lang]/localize';
import Entities from './Entities';

export interface IResultsSearchParams {
	top10?: boolean;
}

export default async function Results({
	params,
	searchParams,
}: {
	params: ILocale;
	searchParams: IResultsSearchParams;
}) {
	const [COMPLETEDBY, TIMEELAPSED, TASKNAME, MARK] = await getTranslation(
		params.lang,
		'pages.results.completedBy',
		'pages.results.timeElapsed',
		'pages.results.taskName',
		'pages.results.mark',
	);

	return (
		<div className={clsx('container', styles.table)}>
			<table>
				<tbody>
					<tr className={styles.upper}>
						<th>{COMPLETEDBY}</th>
						<th>{TASKNAME}</th>
						<th>{TIMEELAPSED}</th>
						<th>{MARK}</th>
					</tr>
					<Entities params={searchParams} />
				</tbody>
			</table>
		</div>
	);
}
