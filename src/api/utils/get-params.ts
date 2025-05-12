import { getKey } from './get-key';

import { isArrayOrObject } from '@src/guards';
import { PlainObject } from '@src/types';

export const getParams = (data: PlainObject | [], parentKey?: string) => {
	const result: [string, string][] = [];

	for (const [key, value] of Object.entries(data)) {
		if (isArrayOrObject(value)) {
			result.push(...getParams(value, getKey(key, parentKey)));
		} else {
			result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
		}
	}

	return result;
};
