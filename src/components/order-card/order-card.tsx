import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";

import { PAGES } from "../../consts/pages";

import styles from "./order-card.module.css";
import { OrderCardFooter } from "./components";

import { FeedOrder } from "@src/api/order/types";
import { getOrderStatusText } from "@src/utils";

interface OrderCardProps {
  order: FeedOrder;
}

export function OrderCard({ order }: OrderCardProps) {
  const location = useLocation();

  const url =
    (location.pathname === PAGES.ORDERS_FEED
      ? PAGES.ORDERS_FEED
      : PAGES.PROFILE_ORDERS) + `/${order.number}`;

  return (
    <Link to={url} state={{ background: location }}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <p className={styles.number}>#{order.number}</p>
          <p className={styles.time}>
            <FormattedDate date={new Date(order.createdAt)} />
          </p>
        </div>
        <div>
          <h3 className={styles.name}>{order.name}</h3>
          <p>{getOrderStatusText(order.status)}</p>
        </div>
        <OrderCardFooter maxIcons={5} ingredientsIds={order.ingredients} />
      </div>
    </Link>
  );
}
