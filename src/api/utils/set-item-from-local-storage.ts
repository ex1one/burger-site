export const setItemToLocalStorage = (key: string, value: any) => {
	try {
		const valueToStore = typeof value === 'object' ? JSON.stringify(value) : value;

		localStorage.setItem(key, valueToStore);
	} catch (error) {
		console.error('Ошибка при сохранении в localStorage:', error);
	}
};
