import { ReactNode, Fragment } from "react";
import { NavLink, Link as BaseLink } from "react-router-dom";

import styles from "./link.module.css";

import { icons } from "@src/consts";

interface LinkProps {
  to: string;
  end?: boolean;
  children: ReactNode;
  leftIcon?: keyof typeof icons;
  isNavLink?: boolean;
  className?: string;
  activeClassName?: string;
  // TODO: Необходимо extends от NavLinkProps, BaseLinkProps. Возможное решение разделить эти компоненты NavLink, Link
  onClick?: VoidFunction;
}

export function Link({
  to,
  end,
  children,
  leftIcon,
  isNavLink = false,
  className,
  activeClassName = "",
  onClick,
}: LinkProps) {
  if (isNavLink) {
    const LeftIcon = leftIcon ? icons[leftIcon] : null;

    return (
      <NavLink to={to} className={styles.link} onClick={onClick} end={end}>
        {({ isActive }) => {
          // TODO: Не нравится работа с className, тяжело перенастраивать стили из вне
          return (
            <Fragment>
              {LeftIcon && (
                <LeftIcon type={isActive ? "primary" : "secondary"} />
              )}
              <span
                className={`${
                  className ? className : "text text_type_main-small"
                } ${isActive ? activeClassName : "text_color_inactive"} `}
              >
                {children}
              </span>
            </Fragment>
          );
        }}
      </NavLink>
    );
  }

  return (
    <BaseLink
      to={to}
      className={`${styles.link} ${className}`}
      onClick={onClick}
    >
      <span className={styles.baseLinkText}>{children}</span>
    </BaseLink>
  );
}
