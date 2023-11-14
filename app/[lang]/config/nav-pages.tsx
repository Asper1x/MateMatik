export interface INavbarPage {
	transPath: string;
	path: string;
}

export const NavbarPages: INavbarPage[] = [
	{
		transPath: 'nav.problems',
		path: '/problems',
	},
	{
		transPath: 'nav.myResults',
		path: '/results',
	},
];
