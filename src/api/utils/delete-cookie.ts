import { setCookie } from './set-cookie';

export const deleteCookie = (name: string) => {
	setCookie(name, '', { 'max-age': -1 });
};
