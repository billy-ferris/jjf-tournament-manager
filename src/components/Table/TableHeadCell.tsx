import type { ComponentProps, FC, PropsWithChildren } from "react";
import classNames from "classnames";

export interface TableHeadCellProps
  extends PropsWithChildren,
    ComponentProps<"th"> {}

export const TableHeadCell: FC<TableHeadCellProps> = ({
  children,
  className,
  ...props
}) => (
  <th
    className={classNames("px-3 py-3.5 group-first/head:first:pl-6", className)}
    {...props}
  >
    {children}
  </th>
);
