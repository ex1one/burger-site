export const getItemFromLocalStorage = (key: string) => {
	try {
		const value = localStorage.getItem(key);
		return value ? JSON.parse(value) : null;
	} catch (error) {
		return null;
	}
};
