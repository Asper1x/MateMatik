export interface INavbarPage {
	transPath: string;
	path: string;
	prefetch?: boolean;
}

export const NavbarPages: INavbarPage[] = [
	{
		transPath: 'nav.problems',
		path: '/problems',
	},
	{
		transPath: 'nav.myResults',
		path: '/results',
		prefetch: false,
	},
	{
		transPath: 'nav.top10Results',
		path: '/results?top10=true',
		prefetch: false,
	},
];
