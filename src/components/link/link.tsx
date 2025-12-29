import { Link as BaseLink, LinkProps as BaseLinkProps } from "react-router-dom";
import clsx from "clsx";

import styles from "./link.module.css";

export function Link({ children, className, ...other }: BaseLinkProps) {
  return (
    <BaseLink className={clsx(styles.wrapper, className)} {...other}>
      <span className={styles.text}>{children}</span>
    </BaseLink>
  );
}
