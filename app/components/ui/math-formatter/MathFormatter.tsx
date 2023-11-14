'use client';

import { MathJax, MathJax3Config, MathJaxContext } from 'better-react-mathjax';
import clsx from 'clsx';

const config: MathJax3Config = {
	loader: { load: ['input/asciimath'] },
	options: {
		renderActions: {
			addMenu: [],
		},
	},
};

export default function MathFormatter({
	expression,
	className,
}: {
	expression: string;
	className?: string;
}) {
	return (
		<MathJaxContext config={config}>
			<MathJax
				className={clsx('MathJax_CHTML', className)}
				inline
				dynamic
			>
				`{expression}`
			</MathJax>
		</MathJaxContext>
	);
}
