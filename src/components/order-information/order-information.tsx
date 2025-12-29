import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./order-information.module.css";

import { OrderInfo } from "@src/api/order/types";
import { getOrderStatusText } from "@src/utils";

interface OrderInformationProps {
  order: OrderInfo;
  className?: string;
  hideOrderNumber?: boolean;
}

export function OrderInformation({
  order,
  className,
  hideOrderNumber = false,
}: OrderInformationProps) {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div className={styles.header}>
        <p
          className={styles.orderNumber}
          style={{ display: hideOrderNumber ? "none" : "block" }}
        >
          #{order.number}
        </p>
        <div className={styles.orderNameAndStatusWrapper}>
          <h1 className={styles.orderName}>{order.name}</h1>
          <p className={styles.orderStatus}>
            {getOrderStatusText(order.status)}
          </p>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.orderStructure}>
          <h2 className="text text_type_main-medium">Состав</h2>
          <div className={styles.orderStructureList}>
            {order.ingredients.map((ingredient) => {
              return (
                <div key={ingredient._id} className={styles.orderItem}>
                  <div key={ingredient._id} className={styles.orderItemContent}>
                    <img
                      src={ingredient.image}
                      className={styles.orderItemImage}
                      loading="lazy"
                    />
                    <p>{ingredient.name}</p>
                  </div>
                  <div className={styles.orderItemCount}>
                    {ingredient.count} x {ingredient.price}{" "}
                    <CurrencyIcon type="primary" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.footer}>
          <p className={styles.time}>
            <FormattedDate date={new Date(order.createdAt)} />
          </p>
          <p className={styles.total}>
            {order.total} <CurrencyIcon type="primary" />
          </p>
        </div>
      </div>
    </div>
  );
}
