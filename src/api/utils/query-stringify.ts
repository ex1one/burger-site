import { getParams } from './get-params';

import { isPlainObject } from '@src/guards';
import { PlainObject } from '@src/types';

export const queryStringify = (data: PlainObject) => {
	if (!isPlainObject(data)) {
		throw new Error('input must be an object');
	}

	return getParams(data)
		.map((arr) => arr.join('='))
		.join('&');
};
