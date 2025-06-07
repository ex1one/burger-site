import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";

import styles from "./feed-item-details.module.css";

import { OrderInformation } from "@src/components";
import { Order } from "@src/api/order/types";

export function FeedItemsDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const content = useMemo(() => {
    if (isLoading) {
      return <div>Loading order details...</div>;
    }

    if (isError) {
      return <div>Error loading order details</div>;
    }

    if (!order) {
      return <div>No order data found for ID: {id}</div>;
    }

    return <OrderInformation {...order} />;
  }, [id, isError, isLoading, order]);

  return <div className={styles.wrapper}>{content}</div>;
}
