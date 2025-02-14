import API from '@src/api';
import { useEffect, useState } from 'react';
import { Ingredients } from '../api/ingredients/types';

export function useGetIngredients() {
	const [data, setData] = useState<Ingredients>([]);
	const [error, setError] = useState<string>();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		let ignore = false;
		setIsLoading(true);

		API.ingredients
			.getIngredients()
			.then((res) => {
				if (!ignore) {
					setData(res.data);
					setError(undefined);
				}
			})
			.catch(() => {
				if (!ignore) {
					setError('Ошибка при получении ингридентов');
					setData([]);
				}
			})
			.finally(() => {
				if (!ignore) {
					setIsLoading(false);
				}
			});

		return () => {
			ignore = true;
		};
	}, []);

	return { data, error, isLoading };
}
