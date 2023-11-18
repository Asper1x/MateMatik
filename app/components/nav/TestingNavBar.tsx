'use client';

import styles from './TestingNavBar.module.scss';
import Link from 'next/link';
import { Caveat } from 'next/font/google';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import useTimer from '@/app/hooks/timer/useTimer';
import { DateUtils, TimeStamp } from '@/lib/utils/test/DateUtils';
import { useRouter } from 'next/navigation';

const caveat = Caveat({ subsets: ['latin'], weight: '700', display: 'swap' });

export default function TestingNavbar({
	hostName,
	startedDate,
	stats,
	className,
	timeStamp,
	maxTime,
}: {
	hostName: string;
	startedDate: Date;
	stats: { done: number; total: number };
	className?: string;
	timeStamp?: TimeStamp;
	maxTime?: number;
}) {
	const [activate, setActivate] = useState(false);
	const { refresh } = useRouter();
	const usingDate = new Date(startedDate.getTime() + (maxTime ?? 0) * 1000);
	let stamp;

	if (timeStamp) {
		stamp = timeStamp;
	} else {
		if (!!maxTime) {
			stamp = useTimer(new Date(), usingDate.getTime(), 1000, true);
			if (stamp.days + stamp.hours + stamp.minutes + stamp.seconds <= 0)
				refresh();
		} else {
			stamp = useTimer(usingDate, Date.now(), 1000, false);
		}
	}

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
						{!timeStamp ? (
							activate && <>{DateUtils.format(stamp)}</>
						) : (
							<>{DateUtils.format(stamp)}</>
						)}
					</p>
					<h2>{`${stats.done}  /  ${stats.total}`}</h2>
				</li>
			</ul>
		</nav>
	);
}
