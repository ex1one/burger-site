export const isArray = (value: unknown): value is [] => {
	return Array.isArray(value);
};
