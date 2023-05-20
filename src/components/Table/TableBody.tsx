import type { ComponentProps, FC, PropsWithChildren } from "react";
import classNames from "classnames";

export interface TableBodyProps
  extends PropsWithChildren,
    ComponentProps<"tbody"> {}

export const TableBody: FC<TableBodyProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <tbody
      className={classNames(
        "group/body divide-y divide-gray-200 bg-white text-gray-900 dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-100",
        className
      )}
      {...props}
    >
      {children}
    </tbody>
  );
};
