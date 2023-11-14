'use client';

import styles from './TestingNavBar.module.scss';
import Link from 'next/link';
import { Caveat } from 'next/font/google';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import useTimer from '@/app/hooks/timer/useTimer';
import { TimeStamp } from '@/lib/utils/test/DateUtils';

const caveat = Caveat({ subsets: ['latin'], weight: '700', display: 'swap' });

export default function TestingNavbar({
	hostName,
	startedDate,
	stats,
	className,
	timeStamp,
}: {
	hostName: string;
	startedDate: Date;
	stats: { done: number; total: number };
	className?: string;
	timeStamp?: TimeStamp;
}) {
	const [activate, setActivate] = useState(false);
	const { hours, minutes, seconds } = (timeStamp ??= useTimer(startedDate));

	useEffect(() => {
		setActivate(true);
	}, []);

	return (
		<nav className={clsx(styles.nav_bar, className)}>
			<ul
				className={clsx(
					'container',
					!activate ? styles.trans : styles.trans_activate,
				)}
			>
				<li>
					<Link
						href={'/'}
						className={clsx(caveat.className, styles.btn_back)}
					>
						{hostName}
					</Link>
					<p>
						{timeStamp ? (
							activate && (
								<>
									{hours.toString().padStart(2, '0')}:
									{minutes.toString().padStart(2, '0')}:
									{seconds.toString().padStart(2, '0')}
								</>
							)
						) : (
							<>
								{hours.toString().padStart(2, '0')}:
								{minutes.toString().padStart(2, '0')}:
								{seconds.toString().padStart(2, '0')}
							</>
						)}
					</p>
					<h2>{`${stats.done}  /  ${stats.total}`}</h2>
				</li>
			</ul>
		</nav>
	);
}
