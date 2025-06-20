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
import { PAGES } from "@src/consts";

export function IngredientDetailsModal() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { ingredientId } = useParams();

  const { ingredients, isLoading, error } = useAppSelector(
    ingredientsSelectors.ingredientsSelector
  );

  const handleClose = () => {
    const referrer = document.referrer;
    const currentHost = window.location.host;

    if (referrer && new URL(referrer).host === currentHost) {
      navigate(-1);
    } else {
      navigate(PAGES.HOME);
    }

    dispatch(ingredientDetailActions.clearIngredientDetail());
  };

  useEffect(() => {
    // TODO: Переписать это
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
        })
        .catch(() => {});
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
      data-cy="ingredient-detail-modal"
    >
      {content}
    </Modal>
  );
}
