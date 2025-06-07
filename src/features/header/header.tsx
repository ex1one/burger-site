import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./header.module.css";

import { PAGES } from "@src/consts";
import { Container, Link } from "@src/components";

export function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <nav>
          <ul className={styles.nav}>
            <div className={styles.navList}>
              <li>
                <Link to={PAGES.HOME} leftIcon="burger" isNavLink>
                  Конструктор
                </Link>
              </li>
              <li>
                <Link to={PAGES.ORDER_FEED} leftIcon="list" isNavLink>
                  Лента заказов
                </Link>
              </li>
            </div>
            <div className={styles.logoContainer}>
              <li>
                <Link to={PAGES.HOME} isNavLink>
                  <Logo />
                </Link>
              </li>
            </div>
            <div>
              <li>
                <Link to={PAGES.PROFILE} leftIcon="profile" isNavLink>
                  Личный кабинет
                </Link>
              </li>
            </div>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
