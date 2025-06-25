import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";

import { Modal } from "../modal";
import { IngredientDetails, Loader } from "..";
import { ingredientDetailThunks } from "../../services/ingredientDetail/slice";

import styles from "./ingredient-details-modal.module.css";

import { useAppDispatch, useAppSelector } from "@src/hooks";
import {
  ingredientDetailActions,
  ingredientDetailSelectors,
} from "@src/services/ingredientDetail/slice";
import { ERROR_MESSAGE, PAGES } from "@src/consts";
import { isErrorByStatus, isPendingByStatus } from "@src/utils";

export function IngredientDetailsModal() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { ingredientId } = useParams();

  const { ingredient, status, error } = useAppSelector(
    ingredientDetailSelectors.sliceSelector
  );
  const isPending = isPendingByStatus(status);
  const isError = isErrorByStatus(status);

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
    if (ingredientId && !ingredient) {
      dispatch(ingredientDetailThunks.getIngredient(ingredientId));
    }
  }, [dispatch, ingredient, ingredientId]);

  const content = useMemo(() => {
    if (isPending) {
      return (
        <div className={styles.wrapperCentered}>
          <Loader />
        </div>
      );
    }

    if (isError) {
      return (
        <div className={styles.wrapperCentered}>{error || ERROR_MESSAGE}</div>
      );
    }

    if (!ingredient) {
      return <div className={styles.wrapperCentered}>Ингредиент не найден</div>;
    }

    return <IngredientDetails ingredient={ingredient} />;
  }, [isPending, isError, ingredient, error]);

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
