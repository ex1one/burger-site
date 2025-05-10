import { TKeyofMethods } from './types/methods';
import { queryStringify } from './utils/query-stringify';
import METHODS from './config/methods';
import { getCookie, handleError as handleApiError, isValidJSON, setCookie } from '@src/api/utils';
import API from '.';

export interface Options {
	method: TKeyofMethods;
	timeout?: number;
	headers?: Record<string, any>;
	data?: any;
	params?: Pick<XMLHttpRequest, 'responseType'>;
}

type OptionsWithoutMethod = Omit<Options, 'method'>;
type HTTPMethod = <D = unknown>(url: string, options?: OptionsWithoutMethod) => Promise<D>;

class HTTPTransport {
	get: HTTPMethod = (url, options) => {
		return this.request(url, { ...options, method: METHODS.GET });
	};

	put: HTTPMethod = (url, options) => {
		return this.request(url, { ...options, method: METHODS.PUT });
	};

	patch: HTTPMethod = (url, options) => {
		return this.request(url, { ...options, method: METHODS.PATCH });
	};

	post: HTTPMethod = (url, options) => {
		return this.request(url, { ...options, method: METHODS.POST });
	};

	delete: HTTPMethod = (url, options) => {
		return this.request(url, { ...options, method: METHODS.DELETE });
	};

	request<T>(url: string, options: Options): Promise<T> {
		const {
			method = METHODS.GET,
			data,
			headers = {},
			timeout = 5000,
			params = { responseType: 'text' },
		} = options;

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			const isGet = method === METHODS.GET;

			// TODO: Поменять на true
			xhr.withCredentials = false;
			xhr.responseType = params.responseType;
			xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url, true);

			xhr.timeout = timeout;

			Object.entries(headers).forEach(([key, value]) => {
				xhr.setRequestHeader(key, value);
			});

			const handleError = (error: any) => {
				console.log({ error });
				return isValidJSON(error) ? reject(handleApiError(JSON.parse(error))) : reject(handleApiError(error));
			};

			xhr.onabort = handleError;
			xhr.onerror = handleError;
			xhr.ontimeout = handleError;

			xhr.onload = async () => {
				try {
					if (xhr.status === 403) {
						const responseData = isValidJSON(xhr.response) ? JSON.parse(xhr.response) : xhr.response;

						if (responseData.message === 'jwt expired') {
							// TODO: Сюда надо пихать refreshToken
							const token = getCookie('token');

							if (token) {
								const { refreshToken } = await API.user.refreshAccessToken(token);
								setCookie(refreshToken, 'token');

								xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url, true);

								Object.entries(headers).forEach(([key, value]) => {
									xhr.setRequestHeader(key, value);
								});
							}

							if (method === METHODS.GET || !data) {
								xhr.send();
							} else {
								if (data instanceof FormData) {
									xhr.send(data);
								} else {
									xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
									xhr.send(JSON.stringify(data));
								}
							}

							return;
						}
					}

					if (xhr.status > 299) {
						handleError(xhr.responseText);
					}
					// TODO: Вынести в отдельную функцию проверку для isValidJSON тут. Чтобы избавиться от повторения кода.
					// Смотри выше
					resolve(isValidJSON(xhr.response) ? JSON.parse(xhr.response) : xhr.response);
				} catch (error) {
					handleError(error);
				}
			};

			if (method === METHODS.GET || !data) {
				xhr.send();
			} else {
				if (data instanceof FormData) {
					xhr.send(data);
				} else {
					xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
					xhr.send(JSON.stringify(data));
				}
			}
		});
	}
}

// TODO: Добавить abort реализацию
const myFetch = new HTTPTransport();

export default myFetch;
