import { type ComponentProps, type FC, type PropsWithChildren } from "react";
import classNames from "classnames";

type HelperTextColors = "default" | "failure";

interface HelperTextTheme {
  base: string;
  colors: Record<HelperTextColors, string>;
}

const theme: HelperTextTheme = {
  base: "mt-2 text-sm",
  colors: {
    default: "text-gray-500 dark:text-gray-400",
    failure: "text-red-600 dark:text-red-500",
  },
};

export interface HelperTextProps
  extends PropsWithChildren<Omit<ComponentProps<"p">, "color">> {
  color?: HelperTextColors;
  value?: string;
}

export const HelperText: FC<HelperTextProps> = ({
  children,
  className,
  color = "default",
  value,
  ...props
}) => {
  return (
    <p
      className={classNames(theme.base, theme.colors[color], className)}
      {...props}
    >
      {value ?? children ?? ""}
    </p>
  );
};
