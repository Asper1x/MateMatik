import styles from './UserNavbar.module.scss';
import { getTranslation } from '@/app/[lang]/localize';
import Link from 'next/link';
import { Caveat } from 'next/font/google';
import clsx from 'clsx';
import { NavbarPages } from '@/app/[lang]/config/nav-pages';

const caveat = Caveat({ subsets: ['latin'], weight: '700' });

export default async function UserNavbar({
	lang,
	className,
}: {
	lang: string;
	className?: string;
}) {
	const pageLabels = await getTranslation(
		lang,
		...NavbarPages.map(({ transPath }) => transPath),
	);

	const [NAME] = await getTranslation(lang, 'host.name');

	return (
		<nav className={clsx(styles.nav_bar, className)}>
			<ul className="container">
				<li>
					<Link
						href={'/'}
						className={clsx(caveat.className, styles.btn_back)}
					>
						{NAME}
					</Link>
				</li>

				{NavbarPages.map((value, index) => (
					<li key={value.path}>
						<Link prefetch={value.prefetch} href={value.path}>
							{pageLabels[index]}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
