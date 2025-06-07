import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./order-information.module.css";

import { Order } from "@src/api/order/types";

interface OrderInformationProps extends Order {
  className?: string;
  hideOrderNumber?: boolean;
}

export function OrderInformation({
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
          #034533
        </p>
        <div className={styles.orderNameAndStatusWrapper}>
          <h1 className={styles.orderName}>
            Black Hole Singularity острый бургер
          </h1>
          <p className={styles.orderStatus}>Выполнен</p>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.orderStructure}>
          <h2 className="text text_type_main-medium">Состав</h2>
          <div className={styles.orderStructureList}>
            <div className={styles.orderItem}>
              <div className={styles.orderItemContent}>
                <img
                  src="/images/Биокотлета из марсианской Магнолии.png"
                  className={styles.orderItemImage}
                />
                <p>Флюоресцентная булка R2-D3</p>
              </div>
              <div className={styles.orderItemCount}>
                2 x 20 <CurrencyIcon type="primary" />
              </div>
            </div>
            <div className={styles.orderItem}>
              <div className={styles.orderItemContent}>
                <img
                  src="/images/Биокотлета из марсианской Магнолии.png"
                  className={styles.orderItemImage}
                />
                <p>Флюоресцентная булка R2-D3</p>
              </div>
              <div className={styles.orderItemCount}>
                2 x 20 <CurrencyIcon type="primary" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <p className={styles.time}>Вчера, 13:50</p>
          <p className={styles.total}>
            510 <CurrencyIcon type="primary" />
          </p>
        </div>
      </div>
    </div>
  );
}
