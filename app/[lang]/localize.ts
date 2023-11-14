import { ValidLocate } from '@/middleware';
import 'server-only';

const dictionaries: Record<ValidLocate, any> = {
	en: () =>
		import('../../dictionaries/en.json').then((module) => module.default),
	ru: () =>
		import('../../dictionaries/ru.json').then((module) => module.default),
	ua: () =>
		import('../../dictionaries/ua.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => dictionaries[locale]();
export const getTranslation = async (locale: string, ...pathes: string[]) => {
	const dict = await getDictionary(locale);
	const translated = [];

	let value = undefined;
	for (const path of pathes) {
		for (const key of path.split('.')) {
			value = value == undefined ? dict[key] : value[key];
			//@ts-ignore
			if (typeof value == 'string') {
				//@ts-ignore
				translated.push(value as string);
				value = undefined;
				break;
			}
			continue;
		}
	}

	return translated;
};
