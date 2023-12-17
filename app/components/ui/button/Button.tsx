import clsx from 'clsx';
import { HTMLAttributes } from 'react';
import styles from './Button.module.scss';

const stylesVariant = {
	primary: styles.butn_primary,
	secondary: styles.butn_secondary,
};

interface IButtonElement extends HTMLAttributes<HTMLButtonElement> {
	variant: 'primary' | 'secondary';
}

export default function Button({
	className,
	variant = 'primary',
	children,
	...rest
}: IButtonElement) {
	return (
		<button {...rest} className={clsx(className, stylesVariant[variant])}>
			{children}
		</button>
	);
}
