import { APIError } from '../types/errors';

// TODO: Возможно другая ошибка
export const apiHasError = (response: any): response is APIError => {
	return !response?.success;
};
