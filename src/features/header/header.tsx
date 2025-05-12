import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./header.module.css";

import { Container, Link } from "@src/components";

export function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <nav>
          <ul className={styles.nav}>
            <div className={styles.navList}>
              <li>
                <Link to="/" leftIcon="burger" isNavLink>
                  Конструктор
                </Link>
              </li>
              <li>
                <Link to="/orders" leftIcon="list" isNavLink>
                  Лента заказов
                </Link>
              </li>
            </div>
            <div className={styles.logoContainer}>
              <li>
                <Link to="/" isNavLink>
                  <Logo />
                </Link>
              </li>
            </div>
            <div>
              <li>
                <Link to="/profile" leftIcon="profile" isNavLink>
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
