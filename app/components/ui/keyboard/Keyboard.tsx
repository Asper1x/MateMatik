'use client';
import clsx from 'clsx';
import styles from './Keyboard.module.scss';
import { type RefObject } from 'react';

export default function UserKeyboard({
	formRef,
}: {
	formRef: RefObject<HTMLFormElement>;
}) {
	const entries = Array.from(Array(9).keys()).map(String);
	entries.push('CE', '9', 'Enter');

	const onClick = (
		event: React.MouseEvent<HTMLButtonElement>,
		value: string,
	) => {
		event.stopPropagation();
		if (formRef.current) {
			const inputArea = formRef.current['answer'];
			if (value == 'CE') {
				if (inputArea.value) {
					inputArea.value = inputArea.value.slice(0, -1);
				}
				return;
			} else if (value == 'Enter') {
				formRef.current.requestSubmit();
				inputArea.value = '';
				return;
			}
			inputArea.value += value;
		}
	};

	return (
		<div className={clsx('keyboard', styles.layout)}>
			<div className="container">
				{entries.map((entry) => (
					<button
						key={`KEY_${entry}`}
						onMouseDown={(event) => onClick(event, entry)}
					>
						{entry}
					</button>
				))}
			</div>
		</div>
	);
}
