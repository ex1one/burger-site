import { PlainObject } from '@src/types';

export const isPlainObject = (value: unknown): value is PlainObject => {
	return (
		typeof value === 'object' &&
		value !== null &&
		value.constructor === Object &&
		Object.prototype.toString.call(value) === '[object Object]'
	);
};
