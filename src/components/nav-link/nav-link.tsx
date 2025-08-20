import {
  NavLink as BaseNavLink,
  NavLinkProps as BaseNavLinkProps,
} from "react-router-dom";
import clsx from "clsx";
import { ReactNode } from "react";

import styles from "./nav-link.module.css";

import { icons } from "@src/consts";

interface NavLinkProps extends BaseNavLinkProps {
  children: ReactNode;
  leftIcon?: keyof typeof icons;
  size?: "sm" | "md";
}

export function NavLink({
  children,
  leftIcon,
  className,
  size = "sm",
  ...other
}: NavLinkProps) {
  const LeftIcon = leftIcon ? icons[leftIcon] : null;

  return (
    <BaseNavLink className={clsx(styles.wrapper, className)} {...other}>
      {({ isActive }) => {
        return (
          <>
            {LeftIcon && <LeftIcon type={isActive ? "primary" : "secondary"} />}
            <span
              className={clsx({
                [styles.activeText]: isActive,
                [styles.textSizeSmall]: size === "sm",
                [styles.textSizeMedium]: size === "md",
              })}
            >
              {children}
            </span>
          </>
        );
      }}
    </BaseNavLink>
  );
}
