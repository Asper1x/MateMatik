import { NextRequest } from 'next/server';

const locales = ['en', 'ua', 'ru'];
export type ValidLocate = (typeof locales)[number];

function getLocale(request: NextRequest) {
	return locales[1];
}

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const pathnameHasLocale = locales.some(
		(locale) =>
			pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
	);

	if (pathnameHasLocale) return;

	const locale = getLocale(request);
	request.nextUrl.pathname = `/${locale}${pathname}`;

	return Response.redirect(request.nextUrl);
}

export const config = {
	matcher: [
		// Skip all internal paths (_next)
		'/((?!_next).*)',
		// Optional: only run on root (/) URL
		// '/'
	],
};
