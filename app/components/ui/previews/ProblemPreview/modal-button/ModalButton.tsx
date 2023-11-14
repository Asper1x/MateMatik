'use client';

import { ReactNode, useState } from 'react';
import ModalWindow from '../../../modal-window/ModalWindow';
import styles from './ModalButton.module.scss';
import clsx from 'clsx';
import { AStartTesting } from '@/app/actions/testing/testing.action';

export default function ModalButton({
	placeholders,
	problemId,
	children,
}: {
	placeholders: string[];
	problemId: string;
	children: ReactNode;
}) {
	const [active, setActive] = useState(false);
	const actionWithId = AStartTesting.bind(null, problemId);

	return (
		<>
			<div>
				<button
					className={styles.button_link}
					onClick={() => setActive(true)}
				/>
				<ModalWindow active={active} setActive={setActive}>
					<div className={clsx('container', styles.mod_container)}>
						{children}
					</div>
					<form action={actionWithId} className={styles.custom_form}>
						<input
							required
							placeholder={placeholders[0]}
							id="username"
							name="username"
							type="text"
							minLength={5}
						/>
						<button type="submit">{placeholders[1]}</button>
					</form>
				</ModalWindow>
			</div>
		</>
	);
}
