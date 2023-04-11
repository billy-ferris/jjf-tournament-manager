import classNames from "classnames";
import type { ComponentProps, FC, PropsWithChildren } from "react";
import { useState } from "react";

import { NavbarContext } from "./NavBarContext";
import { NavbarBrand } from "./NavBarBrand";

interface NavbarTheme {
  base: string;
  inner: {
    base: string;
  };
}

const theme: NavbarTheme = {
  base: "absolute w-full bg-white px-5 py-5 dark:bg-gray-900",
  inner: {
    base: "mx-auto flex flex-wrap items-center justify-between",
  },
};

interface NavbarComponentProps
  extends PropsWithChildren,
    ComponentProps<"nav"> {
  menuOpen?: boolean;
}

const NavbarComponent: FC<NavbarComponentProps> = ({
  children,
  className,
  menuOpen,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(menuOpen);

  return (
    <NavbarContext.Provider value={{ isOpen, setIsOpen }}>
      <nav className={classNames(theme.base, className)} {...props}>
        <div className={classNames(theme.inner.base)}>{children}</div>
      </nav>
    </NavbarContext.Provider>
  );
};

NavbarComponent.displayName = "Navbar";
NavbarBrand.displayName = "Navbar.Brand";

export const Navbar = Object.assign(NavbarComponent, {
  Brand: NavbarBrand,
});
