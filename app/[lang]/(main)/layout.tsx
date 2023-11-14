import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.scss';
import UserNavbar from '../../components/nav/UserNavbar';

const inter = Inter({ subsets: ['cyrillic-ext'], weight: '400' });

export const metadata: Metadata = {
	title: 'MateMatik',
	description: 'Generated by create next app',
};

export default function RootLayout({
	children,
	params,
}: {
	params: { lang: string };
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<UserNavbar lang={params.lang} />
				{children}
			</body>
		</html>
	);
}