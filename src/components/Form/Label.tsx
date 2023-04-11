import { type ComponentProps, type FC, type PropsWithChildren } from "react";
import classNames from "classnames";

type LabelColors = "default" | "failure";

interface LabelTheme {
  base: string;
  colors: Record<LabelColors, string>;
  disabled: string;
}

const theme: LabelTheme = {
  base: "text-sm font-medium",
  disabled: "opacity-50",
  colors: {
    default: "text-gray-900 dark:text-gray-300",
    failure: "text-red-700 dark:text-red-500",
  },
};

interface LabelProps
  extends PropsWithChildren<Omit<ComponentProps<"label">, "color">> {
  color?: LabelColors;
  disabled?: boolean;
  value?: string;
}

export const Label: FC<LabelProps> = ({
  children,
  className,
  color = "default",
  disabled = false,
  value,
  ...props
}) => (
  <label
    className={classNames(
      theme.base,
      theme.colors[color],
      disabled ?? theme.disabled,
      className
    )}
    {...props}
  >
    {value ?? children ?? ""}
  </label>
);
