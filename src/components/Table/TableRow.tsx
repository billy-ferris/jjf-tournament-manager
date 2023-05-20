import type { ComponentProps, FC, PropsWithChildren } from "react";
import classNames from "classnames";

export interface TableRowProps
  extends PropsWithChildren,
    ComponentProps<"tr"> {}

export const TableRow: FC<TableRowProps> = ({
  children,
  className,
  ...props
}) => (
  <tr
    data-testid="table-row-element"
    className={classNames("group/row", className)}
    {...props}
  >
    {children}
  </tr>
);
