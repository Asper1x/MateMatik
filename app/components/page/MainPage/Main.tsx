import clsx from 'clsx';
import styles from './Main.module.scss';
import Button from '../../ui/button/Button';
import Link from 'next/link';

export default function Main() {
	return (
		<div className={clsx('container', styles.container)}>
			<h2>ТРЕНАЖЕР УСНОГО РАХУНКУ</h2>
			<p>
				Тренування мозку для покращення пам'яті, уваги, мислення та
				особистої продуктивності в онлайн формі.
			</p>
			<div className={styles.infos}>
				<div>
					<h3>Навіщо це потрібно?</h3>
					<ul>
						<li>Покращити навички усного рахунку</li>
						<li>Поліпшити роботу мозку</li>
						<li>Підвищити навченість</li>
					</ul>
				</div>
				<div>
					<h3>Скільки це коштує?</h3>
					<p>Ви можете тренуватися абсолютно безкоштовно.</p>
				</div>
			</div>
			<Link href={'/problems'}>
				<Button variant="secondary">ПОЧАТИ ТРЕНУВАННЯ</Button>
			</Link>
		</div>
	);
}
