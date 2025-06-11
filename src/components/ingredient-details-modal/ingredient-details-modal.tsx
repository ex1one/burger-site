import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";

import { Modal } from "../modal";
import { IngredientDetails } from "..";

import { useAppDispatch, useAppSelector } from "@src/hooks";
import { ingredientDetailActions } from "@src/services/ingredientDetail/slice";
import {
  ingredientsSelectors,
  ingredientsThunks,
} from "@src/services/ingredients";

export function IngredientDetailsModal() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { ingredientId } = useParams();

  const { ingredients, isLoading, error } = useAppSelector(
    ingredientsSelectors.ingredientsSelector
  );

  const handleClose = () => {
    navigate(-1);
    dispatch(ingredientDetailActions.clearIngredientDetail());
  };

  useEffect(() => {
    if (ingredientId && ingredients.length === 0) {
      dispatch(ingredientsThunks.fetchIngredients())
        .unwrap()
        .then((res) => {
          const selectedIngredient = res.find(
            (ingredient) => ingredient._id === ingredientId
          );

          if (selectedIngredient) {
            dispatch(
              ingredientDetailActions.setIngredientDetail(selectedIngredient)
            );
          }

          return res;
        });
    }
  }, [dispatch, ingredientId, ingredients]);

  const content = useMemo(() => {
    if (isLoading) {
      return "Loading...";
    }

    if (error) {
      return "Error";
    }

    return <IngredientDetails />;
  }, [isLoading, error]);

  return (
    <Modal
      isOpen={Boolean(ingredientId)}
      onClose={handleClose}
      title="Детали ингредиента"
    >
      {content}
    </Modal>
  );
}
