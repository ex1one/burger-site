import myFetch from '@src/api/my-fetch';

import { YandexApi } from '../config/urls';
import { Ingredients } from './types';

const BASE_URL = YandexApi;

export const getIngredients = () => {
	return myFetch.get<{ success: boolean; data: Ingredients }>(BASE_URL + '/ingredients');
};
