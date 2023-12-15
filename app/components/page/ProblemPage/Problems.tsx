import ILocale from '@/app/types/props/lang/ILocale';
import ProblemsService from '@/lib/services/problem/problem.service';
import ProblemPreview from '../../ui/previews/ProblemPreview/ProblemPreview';
import styles from './Problems.module.scss';
import { TagService } from '@/lib/services/tag/tag.service';
import ProblemTag from '../../ui/tag/ProblemTag';
import Link from 'next/link';
import { NumberType } from '@/lib/utils/test/TestUtils';
import ProblemsType from './ProblemsType/ProblemsType';

function getQuery(tag: string, searchTags: string[]) {
	const tagIndex = searchTags.indexOf(tag);
	const clone = [...searchTags];

	if (tagIndex > -1) {
		clone.splice(tagIndex, 1);
	}

	return clone.concat(tagIndex > -1 ? [] : tag).join(',');
}

export interface IProblemsSearchParams {
	tags?: string | string[];
}

export default async function Problems({
	params,
	searchParams,
}: {
	params: ILocale;
	searchParams: IProblemsSearchParams;
}) {
	const searchTags = searchParams.tags
		? typeof searchParams.tags == 'string'
			? searchParams.tags.split(',')
			: searchParams.tags
		: [];

	const [problems, tags] = await Promise.all([
		ProblemsService.get({
			take: 10,
			page: 1,
			prompt: { tagNames: searchTags },
		}),
		TagService.getAll(),
	]);

	return (
		<div className="container">
			<div className={styles.rows}>
				{Object.values(NumberType)
					.slice(0, 3)
					.map((type) => (
						<ProblemsType
							key={`type_${type}`}
							lang={params.lang}
							type={type}
							problems={problems}
						/>
					))}
			</div>
		</div>
	);
}
