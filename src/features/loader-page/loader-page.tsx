import styles from "./loader-page.module.css";

import { Loader } from "@src/components";

export function LoaderPage() {
  return (
    <div className={styles.wrapper}>
      <Loader />
    </div>
  );
}
