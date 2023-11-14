import {
	CSSProperties,
	type PropsWithChildren,
	type HTMLAttributes,
} from 'react';
import Icon, { IconName } from '../../icon/Icon';
import { IProblem } from '@/lib/services/problem/problem.interface';
import { TagProperties } from '@/app/[lang]/config/tag-types';
import styles from './ProblemThumb.module.scss';
import clsx from 'clsx';

interface IProblemThumb extends HTMLAttributes<HTMLDivElement> {
	problem: IProblem;
}

export default function ProblemThumb({
	problem,
	className,
}: PropsWithChildren<IProblemThumb>) {
	const icons: IconName[] = [];
	let appearance: CSSProperties = {};

	for (const tag of problem.tagNames) {
		if (TagProperties[tag].type == 'icon') {
			icons.push(TagProperties[tag].value as IconName);
		} else {
			appearance = {
				...appearance,
				...(TagProperties[tag].value as CSSProperties),
			};
		}
	}

	return (
		<div className={clsx(styles.background, className)} style={appearance}>
			{icons.map((icon) => (
				<Icon key={icon as string} size={50} name={icon} />
			))}
		</div>
	);
}
