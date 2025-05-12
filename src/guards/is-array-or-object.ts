import { isPlainObject } from './is-plain-object';
import { isArray } from './is-array';

import { PlainObject } from '@src/types';

export const isArrayOrObject = (value: unknown): value is [] | PlainObject => {
  return isPlainObject(value) || isArray(value);
};
