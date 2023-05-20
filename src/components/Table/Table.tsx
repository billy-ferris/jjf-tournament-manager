import classNames from "classnames";
import type { ComponentProps, FC, PropsWithChildren } from "react";
import { TableBody } from "./TableBody";
import { TableCell } from "./TableCell";
import { TableHead } from "./TableHead";
import { TableHeadCell } from "./TableHeadCell";
import { TableRow } from "./TableRow";

export interface TableProps
  extends PropsWithChildren,
    ComponentProps<"table"> {}

const TableComponent: FC<TableProps> = ({ children, className, ...props }) => {
  return (
    <table
      className={classNames(
        "min-w-full divide-y divide-gray-300 overflow-hidden text-left text-sm text-gray-500 ring-1 ring-black ring-opacity-5 dark:divide-gray-500 dark:text-gray-100",
        className
      )}
      {...props}
    >
      {children}
    </table>
  );
};

TableComponent.displayName = "Table";
TableHead.displayName = "Table.Head";
TableBody.displayName = "Table.Body";
TableRow.displayName = "Table.Row";
TableCell.displayName = "Table.Cell";
TableHeadCell.displayName = "Table.HeadCell";

export const Table = Object.assign(TableComponent, {
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
  HeadCell: TableHeadCell,
});
