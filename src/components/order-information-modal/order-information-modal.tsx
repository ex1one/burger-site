import { useMemo } from "react";

import { Modal } from "../modal";
import { OrderInformation } from "../order-information";

import styles from "./order-information-modal.module.css";

import { modalsActions, modalsSelectors } from "@src/services/modals";
import { useAppDispatch, useAppSelector } from "@src/hooks";
import { NAMES_OF_MODALS } from "@src/consts";

export function OrderInformationModal() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) =>
    modalsSelectors.modalSelector(state, NAMES_OF_MODALS.ORDER_DETAIL_MODAL)
  );

  const handleClose = () => {
    dispatch(modalsActions.closeModal(NAMES_OF_MODALS.ORDER_DETAIL_MODAL));
  };

  const content = useMemo(() => {
    return <OrderInformation hideOrderNumber />;
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={{ title: "#034533", size: "md" }}
      className={styles.content}
    >
      {content}
    </Modal>
  );
}
