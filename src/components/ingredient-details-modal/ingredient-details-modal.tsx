import { useAppDispatch, useAppSelector } from '@src/hooks';
import { Modal } from '../modal';

import { ingredientDetailActions } from '@src/services/ingredientDetail/slice';
import { useNavigate, useParams } from 'react-router-dom';
import { IngredientDetails } from '..';
import { useEffect, useMemo } from 'react';
import { ingredientsSelectors } from '@src/services/ingredients';
import { fetchIngredients } from '@src/services/ingredients/thunks';

export function IngredientDetailsModal() {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { ingredientId } = useParams();

	const { ingredients, isLoading, error } = useAppSelector(ingredientsSelectors.ingredientsSelector);

	const handleClose = () => {
		navigate(-1);
		dispatch(ingredientDetailActions.clearIngredientDetail());
	};

	useEffect(() => {
		if (ingredientId && ingredients.length === 0) {
			dispatch(fetchIngredients())
				.unwrap()
				.then((res) => {
					const selectedIngredient = res.find((ingredient) => ingredient._id === ingredientId);

					if (selectedIngredient) {
						dispatch(ingredientDetailActions.setIngredientDetail(selectedIngredient));
					}

					return res;
				});
		}
	}, [ingredientId, ingredients]);

	const content = useMemo(() => {
		if (isLoading) {
			return 'Loading...';
		}

		if (error) {
			return 'Error';
		}

		return <IngredientDetails />;
	}, [isLoading, error]);

	return (
		<Modal
			isOpen={Boolean(ingredientId)}
			onClose={handleClose}
			title='Детали ингредиента'
		>
			{content}
		</Modal>
	);
}
