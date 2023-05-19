import type { ComponentProps, ElementType, FC, PropsWithChildren } from "react";
import { type LinkProps } from "next/link";
import classNames from "classnames";

export interface NavbarBrandTheme {
  base: string;
}

export interface NavbarBrandProps
  extends PropsWithChildren<ComponentProps<"a">>,
    Partial<Pick<LinkProps, "href">> {
  as?: ElementType;
  href?: string;
}

const theme = {
  base: "flex items-center",
};

export const NavbarBrand: FC<NavbarBrandProps> = ({
  as: Component = "a",
  children,
  className,
  ...props
}) => {
  return (
    <Component className={classNames(theme.base, className)} {...props}>
      {children}
    </Component>
  );
};
