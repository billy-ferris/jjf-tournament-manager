import type { ComponentProps, FC, PropsWithChildren } from "react";
import classNames from "classnames";

export interface TableHeadProps
  extends PropsWithChildren,
    ComponentProps<"thead"> {}

export const TableHead: FC<TableHeadProps> = ({
  children,
  className,
  ...props
}) => (
  <thead
    className={classNames(
      "group/head bg-gray-50 text-left text-sm font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-400",
      className
    )}
    {...props}
  >
    <tr>{children}</tr>
  </thead>
);
