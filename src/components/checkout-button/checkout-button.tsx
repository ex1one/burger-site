import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./checkout-button.module.css";

import { useAppDispatch, useAppSelector } from "@src/hooks";
import { NAMES_OF_MODALS, PAGES } from "@src/consts";
import { constructorIngredientsSelectors } from "@src/services/constructorIngredients";
import { modalsActions } from "@src/services/modals";
import { userSelectors } from "@src/services/user";
import { orderSelectors, orderThunks } from "@src/services/order";
import { isPendingByStatus } from "@src/utils";

export const CheckoutButton = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const orderStatus = useAppSelector(orderSelectors.statusSelector);
  const isPending = isPendingByStatus(orderStatus);

  const ingredients = useAppSelector(
    constructorIngredientsSelectors.ingredientsSelector
  );
  const user = useAppSelector(userSelectors.userSelector);

  const totalPrice = useMemo(() => {
    return ingredients.reduce((acc, el) => acc + el.price, 0);
  }, [ingredients]);

  const handleClick = () => {
    if (!user) {
      navigate(PAGES.SIGN_IN);
      return;
    }

    dispatch(orderThunks.createOrderThunk(ingredients.map((el) => el._id)));
    dispatch(modalsActions.openModal(NAMES_OF_MODALS.ORDER_SUCCESS_MODAL));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.price}>
        <p className="text text_type_digits-medium">{totalPrice}</p>
        <CurrencyIcon type="primary" className={styles.priceIcon} />
      </div>
      <Button
        htmlType="button"
        type="primary"
        size="large"
        onClick={handleClick}
        data-cy="checkout-button"
        disabled={isPending}
      >
        Оформить заказ
      </Button>
    </div>
  );
};
