'use client';

import { ITesting } from '@/lib/services/testing/testing.interface';
import clsx from 'clsx';
import styles from './Testing.module.scss';
import UserKeyboard from '../../ui/keyboard/Keyboard';
import { useRef, useState } from 'react';
import { ASendAnswer } from '@/app/actions/testing/testing.action';
import { MathJax, MathJax3Config, MathJaxContext } from 'better-react-mathjax';
import TestingNavbar from '../../nav/TestingNavBar';
import { useRouter } from 'next/navigation';
import MathFormatter from '../../ui/math-formatter/MathFormatter';

const config: MathJax3Config = {
	loader: { load: ['input/asciimath'] },
};

export default function TestingPage({
	testing,
	test,
	HOSTNAME,
}: {
	testing: ITesting;
	test: string[];
	HOSTNAME: string;
}) {
	const formRef = useRef<HTMLFormElement>(null);
	const [currentTest, setCurrTest] = useState(test[testing.answers.length]);
	const { refresh } = useRouter();
	const action = async (data: FormData) => {
		await ASendAnswer(testing.id, test[testing.answers.length - 1], data);
		if (testing.answers.length >= test.length) {
			refresh();
			return;
		}
	};

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		const formData = new FormData(event.currentTarget);
		const answer = formData.get('answer')?.toString();

		if (answer !== undefined && !Number.isNaN(parseFloat(answer))) {
			testing.answers.push(`${currentTest}=${answer}`);
			if (testing.answers.length < test.length) {
				setCurrTest(test[testing.answers.length]);
			}

			return;
		}
		event.preventDefault();
	};

	return (
		<>
			<TestingNavbar
				startedDate={testing.started}
				hostName={HOSTNAME}
				stats={{
					total: test.length,
					done: testing.answers.length + 1,
				}}
			/>
			<div className={clsx('container', styles.mod_container)}>
				<MathJaxContext config={config}>
					<MathJax className={'MathJax_CHTML'} inline dynamic>
						{`\`${currentTest} =\``}
					</MathJax>
				</MathJaxContext>
				<div className={clsx('MathJax_CHTML', styles.input_answer)}>
					<form ref={formRef} onSubmit={onSubmit} action={action}>
						<input
							type="number"
							name="answer"
							placeholder="x"
							className={styles.input_area}
						/>
						<input type="submit" hidden />
					</form>
				</div>
			</div>
			<UserKeyboard formRef={formRef} />
		</>
	);
}

/*
<span
							role="textbox"
							id="answer"
							placeholder={eval(test[0])}
							contentEditable
							spellCheck="false"
							ref={inputRef}
						></span>
*/
