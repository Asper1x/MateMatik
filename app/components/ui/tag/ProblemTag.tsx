import styles from './ProblemTag.module.scss';
import { getTranslation } from '@/app/[lang]/localize';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import clsx from 'clsx';

interface ITagElement extends HTMLAttributes<HTMLSpanElement> {
	lang: string;
	tag: string;
	size?: { height: number; width: number };
}

export default async function ProblemTag({
	lang,
	tag,
	size,
	className,
	...rest
}: PropsWithChildren<ITagElement>) {
	let TRANSLATED;
	if (lang == 'en') {
		TRANSLATED = tag;
	} else if (tag.length <= 1) {
		return <></>;
	} else {
		[TRANSLATED] = await getTranslation(lang, `tags.${tag}`);
	}

	return (
		<span {...rest} className={clsx(className, styles.tag)}>
			{TRANSLATED}
		</span>
	);
}
