import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./header.module.css";

import { PAGES } from "@src/consts";
import { Container, NavLink } from "@src/components";

export function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <nav>
          <ul className={styles.nav}>
            <div className={styles.navList}>
              <li>
                <NavLink to={PAGES.HOME} leftIcon="burger">
                  Конструктор
                </NavLink>
              </li>
              <li>
                <NavLink to={PAGES.ORDERS_FEED} leftIcon="list" end>
                  Лента заказов
                </NavLink>
              </li>
            </div>
            <div className={styles.logoContainer}>
              <li>
                <NavLink to={PAGES.HOME}>
                  <Logo />
                </NavLink>
              </li>
            </div>
            <div>
              <li>
                <NavLink to={PAGES.PROFILE} leftIcon="profile">
                  Личный кабинет
                </NavLink>
              </li>
            </div>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
