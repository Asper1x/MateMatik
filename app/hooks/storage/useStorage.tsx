'use client';

const key = 'savedTesting';

function getStorageValue(key: string) {
	const saved = localStorage.getItem(key);
	return saved ? JSON.parse(saved) : null;
}

export function saveTesting(value: string) {
	let stored = getStorageValue(key);

	if (Object.prototype.toString.call(stored) === '[object Array]') {
		if (!stored.includes(value)) {
			stored.push(value);
		}
	} else {
		stored = [value];
	}

	localStorage.setItem(key, JSON.stringify(stored));
}

export function getSavedTestings() {
	const stored = getStorageValue(key);
	return Object.prototype.toString.call(stored) === '[object Array]'
		? (stored as string[])
		: [];
}
