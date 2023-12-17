'use client';

import { ITesting } from '@/lib/services/testing/testing.interface';
import clsx from 'clsx';
import styles from './Testing.module.scss';
import UserKeyboard from '../../ui/keyboard/Keyboard';
import { useEffect, useRef, useState } from 'react';
import { ARegister, ASendAnswer } from '@/app/actions/testing/testing.action';
import { MathJax, MathJax3Config, MathJaxContext } from 'better-react-mathjax';
import TestingNavbar from '../../nav/TestingNavBar';
import { useRouter } from 'next/navigation';
import { saveTesting } from '@/app/hooks/storage/useStorage';
import Mexp from 'math-expression-evaluator';
import { CalcUtils } from '@/lib/utils/test/CalcUtils';

const mexp = new Mexp();

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
	const [progress, setProgress] = useState({
		mark: CalcUtils.getMark(testing.answers) ?? 0,
		qCost: 0,
	});
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
			let coeff: number;

			coeff =
				//@ts-ignore
				CalcUtils.round(mexp.eval(currentTest)) == answer ? 1 : -1;

			setProgress((prev) => ({ qCost: coeff, mark: prev.mark + coeff }));
			testing.answers.push(`${currentTest}=${answer}`);
			if (testing.answers.length < test.length) {
				setCurrTest(test[testing.answers.length]);
			}

			return;
		}
		event.preventDefault();
	};

	useEffect(() => {
		if (!testing.started) {
			saveTesting(testing.id);
			ARegister(testing.id);
		}
	});

	return (
		<>
			<TestingNavbar
				startedDate={testing.started ?? new Date()}
				hostName={HOSTNAME}
				stats={{
					total: test.length,
					done: testing.answers.length + 1,
					...progress,
				}}
				maxTime={testing.problem?.maxTime}
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
							type="text"
							name="answer"
							placeholder="x"
							step={0.01}
							min={-10000}
							max={10000}
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
