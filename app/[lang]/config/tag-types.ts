import { IconName } from '@/app/components/ui/icon/Icon';
import { CSSProperties } from 'react';

type ITagTypeArr = {
	[key: string]: ITagType;
};

export type ITagType = {
	type: 'icon' | 'appearance';
	value: IconName | CSSProperties;
};

export const TagProperties: ITagTypeArr = {
	hard: {
		type: 'appearance',
		value: { backgroundColor: '#ff0000a9' },
	},
	medium: {
		type: 'appearance',
		value: { backgroundColor: '#ffa500a8' },
	},
	easy: {
		type: 'appearance',
		value: { backgroundColor: '#00ff00a8' },
	},
	n: {
		type: 'appearance',
		value: {},
	},
	q: {
		type: 'appearance',
		value: {},
	},
	z: {
		type: 'appearance',
		value: {},
	},
};

/*
	divide: {
		type: 'icon',
		value: 'divide',
	},
	addition: {
		type: 'icon',
		value: 'plus',
	},
	multiplication: {
		type: 'icon',
		value: 'asterisk',
	},
	subtraction: {
		type: 'icon',
		value: 'minus',
	},
*/
