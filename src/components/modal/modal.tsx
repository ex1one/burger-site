import ReactDOM from "react-dom";
import { ReactNode, useEffect } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import { ModalOverlay } from "./components";
import styles from "./modal.module.css";

interface ModalProps {
  isOpen: boolean;
  title?: string | { title: string; size: "md" | "xl" };
  children: ReactNode;
  className?: string;
  onClose?: VoidFunction;
}

const parent = document.getElementById("modal-root") as HTMLElement;

export function Modal({
  isOpen,
  title,
  children,
  className,
  onClose,
  ...other
}: ModalProps) {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose?.();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={`${styles.modal} ${className}`} {...other}>
        <div className={styles.header}>
          {title && (
            <h3
              className={`text ${
                typeof title !== "string" && title.size === "md"
                  ? "text_type_digits-default"
                  : "text_type_main-large"
              }`}
            >
              {typeof title === "string" ? title : title.title}
            </h3>
          )}
          <button
            className={styles.close}
            onClick={onClose}
            data-cy="button-modal-close"
          >
            <CloseIcon type="primary" />
          </button>
        </div>
        {children}
      </div>
    </>,
    parent
  );
}
